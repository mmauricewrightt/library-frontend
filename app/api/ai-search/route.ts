import { NextResponse } from 'next/server'
import Groq from 'groq-sdk' // 1. Import the Groq SDK

// ==========================================
// 🔐 SETUP
// ==========================================
// Initialize the Groq client using your API key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// ==========================================
// 🚀 POST FUNCTION
// ==========================================
export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    console.log("User query received:", query)

    // ==========================================
    // 🤖 MODEL & INFERENCE
    // ==========================================
    // Groq uses "chat.completions" format (same as OpenAI)
    const chatCompletion = await groq.chat.completions.create({
      // "llama-3.3-70b-versatile" is fast, smart, and free-tier friendly
      model: "llama-3.3-70b-versatile", 
      response_format: { type: "json_object"},
      messages: [
        {
          role: "system",
          content: "You are a library assistant. Suggest 3-5 books. Respond ONLY with a JSON object containing a key 'books' which is an array of objects.Each book object must follow this EXACT schema:{'bookid': number,'bookname': 'string','bookauthor': 'string' } NO SMALL TALK, NO CLOSING REMARKS"
        },
        {
          role: "user",
          content: query,
        },
      ],
      // Optional: controls randomness (0 is precise, 1 is creative)
      temperature: 0.7, 
      max_tokens: 1024,
    })

    const rawContent = chatCompletion.choices[0]?.message?.content || "{}"
    const jsonData = JSON.parse(rawContent)

    // Return the structured data instead of a string
    console.error("GROQ Response:",jsonData)
    return NextResponse.json(jsonData)

    // Extract the text from the response object
    // const text = chatCompletion.choices[0]?.message?.content || ""

    // return NextResponse.json({
    //   results: text,
    // })

  } catch (error: any) {
    // Catch-all for API errors (Rate limits, Invalid keys, etc.)
    console.error("GROQ ERROR:", error.message)

    return NextResponse.json(
      { error: "Groq AI failed to respond" },
      { status: 500 }
    )
  }
}