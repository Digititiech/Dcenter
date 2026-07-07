import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, locale } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in environment variables. Falling back to mock responses.");
      // Provide a high-quality mock response to ensure the user's site still works even if key is missing during initial local testing
      const lastMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";
      let mockReply = "Thank you for consulting Decision Center. For specific details on project finance or feasibility studies, we would need to review your business profile. Would you like to schedule an executive consultation?";
      if (locale === "ar" || /[\u0600-\u06FF]/.test(lastMessage)) {
        mockReply = "شكراً لاستشارتك مركز القرار. بالنسبة للتفاصيل المحددة المتعلقة بتمويل المشاريع أو دراسات الجدوى، سنحتاج لمراجعة ملف عملك. هل ترغب في جدولة جلسة استشارية تنفيذية؟";
      }
      return NextResponse.json({ text: mockReply });
    }

    let systemInstruction = 
      "You are a professional banking, project finance, and feasibility studies expert advisor for 'Decision Center' (a leading strategic consultancy in Sohar, Oman). " +
      "Keep responses structured, highly professional, concise, and focused on Omani market/regulations, banking, project finance, and feasibility studies. " +
      "Address the user directly in the language they write in (English or Arabic). Keep the tone authoritative yet helpful.";

    if (locale === "ar") {
      systemInstruction = 
        "You are a professional banking, project finance, and feasibility studies expert advisor for 'Decision Center' (a leading strategic consultancy in Sohar, Oman). " +
        "IMPORTANT: You MUST respond ONLY in Arabic. The user is browsing the Arabic version of our platform. Under no circumstances should you reply in English, even if the user speaks or asks questions in English. " +
        "Keep responses structured, highly professional, concise, and focused on Omani market/regulations, banking, project finance, and feasibility studies. Keep the tone authoritative yet helpful.";
    }

    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I could not generate a response. Please try again.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
