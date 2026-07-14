package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image/png"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/skip2/go-qrcode"
	"go.mau.fi/whatsmeow"
	"go.mau.fi/whatsmeow/store/sqlstore"
	"go.mau.fi/whatsmeow/types/events"
	waLog "go.mau.fi/whatsmeow/util/log"
	"google.golang.org/protobuf/proto"

	waProto "go.mau.fi/whatsmeow/proto/waE2E"
	"go.mau.fi/whatsmeow/types"
)

// ─── State ────────────────────────────────────────────────────────────────────

type Status string

const (
	StatusDisconnected Status = "disconnected"
	StatusInitializing Status = "initializing"
	StatusQRReady      Status = "qr_ready"
	StatusConnected    Status = "connected"
)

var (
	mu              sync.RWMutex
	waClient        *whatsmeow.Client
	currentStatus   = StatusDisconnected
	qrBase64        string
	connectedNumber string
	systemLogs      []string
	dbContainer     *sqlstore.Container
)

func addLog(msg string) {
	log.Println(msg)
	mu.Lock()
	systemLogs = append(systemLogs, "[SYSTEM] "+msg)
	if len(systemLogs) > 50 {
		systemLogs = systemLogs[len(systemLogs)-50:]
	}
	mu.Unlock()
}

// ─── API Response Types ────────────────────────────────────────────────────────

type StatusResponse struct {
	Status          Status   `json:"status"`
	QRCode          *string  `json:"qrCode"`
	ConnectedNumber *string  `json:"connectedNumber"`
	Logs            []string `json:"logs"`
}

type SendRequest struct {
	To      string `json:"to"`
	Number  string `json:"number"`
	Message string `json:"message"`
}

// ─── WhatsApp Client ──────────────────────────────────────────────────────────

func initDB() {
	logger := waLog.Stdout("Database", "ERROR", true)
	var err error
	dbContainer, err = sqlstore.New(context.Background(), "sqlite3", "file:dcenter_whatsapp.db?_foreign_keys=on", logger)
	if err != nil {
		log.Fatalf("Failed to init DB: %v", err)
	}
}

func startWhatsApp() {
	mu.Lock()
	if currentStatus == StatusInitializing || currentStatus == StatusConnected {
		mu.Unlock()
		addLog("Already initializing or connected.")
		return
	}
	currentStatus = StatusInitializing
	qrBase64 = ""
	mu.Unlock()

	addLog("Initializing WhatsApp session...")

	deviceStore, err := dbContainer.GetFirstDevice(context.Background())
	if err != nil {
		addLog(fmt.Sprintf("Failed to get device store: %v", err))
		mu.Lock()
		currentStatus = StatusDisconnected
		mu.Unlock()
		return
	}

	logger := waLog.Stdout("Client", "ERROR", true)
	waClient = whatsmeow.NewClient(deviceStore, logger)

	waClient.AddEventHandler(func(evt interface{}) {
		switch v := evt.(type) {
		case *events.QR:
			addLog("QR Code generated — waiting for scan.")
			for _, qrCode := range v.Codes {
				img, err := qrcode.Encode(qrCode, qrcode.Medium, 256)
				if err != nil {
					addLog(fmt.Sprintf("Failed to encode QR: %v", err))
					continue
				}
				// Decode PNG bytes and re-encode as base64
				_, err = png.Decode(bytes.NewReader(img))
				if err == nil {
					encoded := "data:image/png;base64," + base64.StdEncoding.EncodeToString(img)
					mu.Lock()
					qrBase64 = encoded
					currentStatus = StatusQRReady
					mu.Unlock()
				}
				break // Use only the first QR code
			}

		case *events.Connected:
			mu.Lock()
			currentStatus = StatusConnected
			qrBase64 = ""
			if waClient.Store.ID != nil {
				connectedNumber = waClient.Store.ID.User
			}
			mu.Unlock()
			addLog(fmt.Sprintf("WhatsApp connected! Number: %s", connectedNumber))

		case *events.Disconnected:
			mu.Lock()
			currentStatus = StatusDisconnected
			connectedNumber = ""
			mu.Unlock()
			addLog("WhatsApp disconnected. Will auto-reconnect in 10 seconds...")
			// Auto-reconnect after unexpected disconnection
			go func() {
				time.Sleep(10 * time.Second)
				mu.RLock()
				s := currentStatus
				mu.RUnlock()
				if s == StatusDisconnected {
					addLog("Auto-reconnecting...")
					startWhatsApp()
				}
			}()

		case *events.LoggedOut:
			mu.Lock()
			currentStatus = StatusDisconnected
			qrBase64 = ""
			connectedNumber = ""
			mu.Unlock()
			addLog("WhatsApp logged out.")
		}
	})

	err = waClient.Connect()
	if err != nil {
		addLog(fmt.Sprintf("Failed to connect: %v", err))
		mu.Lock()
		currentStatus = StatusDisconnected
		mu.Unlock()
	}
}

func disconnectWhatsApp() error {
	mu.Lock()
	defer mu.Unlock()

	if waClient == nil {
		// Already disconnected
		currentStatus = StatusDisconnected
		qrBase64 = ""
		connectedNumber = ""
		return nil
	}

	waClient.Disconnect()
	waClient = nil
	currentStatus = StatusDisconnected
	qrBase64 = ""
	connectedNumber = ""
	addLog("WhatsApp disconnected by admin.")
	return nil
}

// autoConnect checks if a saved session exists in the DB and connects automatically.
func autoConnect() {
	deviceStore, err := dbContainer.GetFirstDevice(context.Background())
	if err != nil {
		addLog(fmt.Sprintf("Auto-connect: no saved session found (%v)", err))
		return
	}
	if deviceStore.ID == nil {
		addLog("Auto-connect: no previous session found. Waiting for manual init.")
		return
	}

	addLog("Auto-connect: found saved session — reconnecting...")
	go startWhatsApp()
}

// ─── HTTP Handlers ─────────────────────────────────────────────────────────────

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func writeJSON(w http.ResponseWriter, code int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func handleStatus(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	defer mu.RUnlock()

	resp := StatusResponse{
		Status: currentStatus,
		Logs:   systemLogs,
	}
	if qrBase64 != "" {
		resp.QRCode = &qrBase64
	}
	if connectedNumber != "" {
		resp.ConnectedNumber = &connectedNumber
	}

	writeJSON(w, http.StatusOK, resp)
}

func handleInit(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	status := currentStatus
	mu.RUnlock()

	if status == StatusConnected {
		writeJSON(w, http.StatusOK, map[string]string{
			"status":  "connected",
			"message": "WhatsApp is already connected",
		})
		return
	}

	go startWhatsApp()

	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "initializing",
		"message": "WhatsApp initialization started",
	})
}

func handleDisconnect(w http.ResponseWriter, r *http.Request) {
	if err := disconnectWhatsApp(); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func handleSend(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	client := waClient
	status := currentStatus
	mu.RUnlock()

	if client == nil || status != StatusConnected {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "WhatsApp client is not connected",
		})
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid body"})
		return
	}
	defer r.Body.Close()

	var req SendRequest
	if err := json.Unmarshal(body, &req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid JSON"})
		return
	}

	target := req.To
	if target == "" {
		target = req.Number
	}
	if target == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "Target number is required (to or number)",
		})
		return
	}

	// Normalize to JID format
	jid, err := types.ParseJID(target + "@s.whatsapp.net")
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid JID"})
		return
	}

	_, err = client.SendMessage(context.Background(), jid, &waProto.Message{
		Conversation: proto.String(req.Message),
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

// ─── Main ─────────────────────────────────────────────────────────────────────

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}

	initDB()
	addLog("WhatsApp gateway ready.")

	// Auto-connect if a saved session exists
	go autoConnect()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/status", corsMiddleware(handleStatus))
	mux.HandleFunc("/api/whatsapp-status", corsMiddleware(handleStatus))
	mux.HandleFunc("/api/init-whatsapp", corsMiddleware(handleInit))
	mux.HandleFunc("/api/disconnect-whatsapp", corsMiddleware(handleDisconnect))
	mux.HandleFunc("/api/send", corsMiddleware(handleSend))
	mux.HandleFunc("/api/send-whatsapp", corsMiddleware(handleSend))

	addr := ":" + port
	log.Printf("WhatsApp automation server (Go/whatsmeow) listening on port %s\n", port)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
