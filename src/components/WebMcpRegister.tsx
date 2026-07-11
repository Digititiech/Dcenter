"use client";

import { useEffect } from "react";

export default function WebMcpRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the experimental WebMCP API is available
    const nav = navigator as any;
    if (nav.modelContext && typeof nav.modelContext.registerTool === "function") {
      try {
        const controller = new AbortController();
        
        // Register a tool to fetch company services info
        nav.modelContext.registerTool(
          "get_company_services",
          {
            description: "Get detailed information about Decision Center's financial and economic consulting services, restructurings, and feasibility studies.",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "Optional category to filter services by (e.g., restructuring, feasibility, banking)",
                  enum: ["restructuring", "feasibility", "banking", "sovereign"]
                }
              }
            },
            signal: controller.signal
          },
          async (args: { category?: string }) => {
            return {
              content: [
                {
                  type: "text",
                  text: "Decision Center provides: \n1. Asset & Capital Restructuring: Optimizing wealth and capital efficiency.\n2. Project Finance & Feasibility Studies: End-to-end feasibility and funding solutions for Oman and the GCC.\n3. Sovereign Advisory: Assisting governmental and institutional entities in strategic decision making."
                }
              ]
            };
          }
        );

        // Register a tool to book a consultation
        nav.modelContext.registerTool(
          "book_consultation",
          {
            description: "Request a consultation callback or details on how to book a session.",
            inputSchema: {
              type: "object",
              properties: {
                clientName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                message: { type: "string" }
              },
              required: ["clientName", "email", "phone"]
            },
            signal: controller.signal
          },
          async (args: any) => {
            return {
              content: [
                {
                  type: "text",
                  text: `Thank you, ${args.clientName}. A booking request has been initiated. Please complete the process by visiting the contact page at https://www.dcenterfe.com/contact or by messaging us directly.`
                }
              ]
            };
          }
        );

        return () => {
          controller.abort();
        };
      } catch (err) {
        console.error("Failed to register WebMCP tools:", err);
      }
    }
  }, []);

  return null;
}
