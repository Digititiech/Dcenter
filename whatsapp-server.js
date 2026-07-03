const http = require('http');
const { create } = require('@open-wa/wa-automate');

let clientInstance = null;
let qrCodeBase64 = null;
let currentStatus = 'INITIALIZING'; // 'INITIALIZING', 'SCAN_QR', 'CONNECTED', 'CLOSED'

function startBot() {
  create({
    sessionId: "dcenter_whatsapp",
    qrTimeout: 0,
    authTimeout: 0,
    headless: true,
    qrCallback: (base64Qr) => {
      qrCodeBase64 = base64Qr;
      currentStatus = 'SCAN_QR';
      console.log('New QR Code generated, please scan.');
    }
  }).then(client => {
    clientInstance = client;
    currentStatus = 'CONNECTED';
    qrCodeBase64 = null;
    console.log('WhatsApp Bot connected successfully!');

    // Simple Auto-responder
    client.onMessage(async message => {
      if (message.body.toLowerCase() === 'hello' || message.body.toLowerCase() === 'مرحبا') {
        await client.sendText(message.from, 'Hello! Welcome to Decision Center Sovereign Advisory. How can we assist you today?');
      }
    });
  }).catch(err => {
    console.error('Failed to initialize WhatsApp bot:', err);
    currentStatus = 'CLOSED';
  });
}

// Start the bot sequence
startBot();

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: currentStatus }));
  } 
  else if (url.pathname === '/api/qr' && req.method === 'GET') {
    if (currentStatus === 'SCAN_QR' && qrCodeBase64) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ qr: qrCodeBase64 }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'QR Code not available. Status: ' + currentStatus }));
    }
  } 
  else if (url.pathname === '/api/send' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const { to, message } = payload;
        
        if (!clientInstance || currentStatus !== 'CONNECTED') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'WhatsApp client is not connected' }));
          return;
        }

        // Send text message
        const formattedTo = to.includes('@c.us') ? to : `${to.replace(/[^0-9]/g, '')}@c.us`;
        await clientInstance.sendText(formattedTo, message);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WhatsApp automation server listening on port ${PORT}`);
});
