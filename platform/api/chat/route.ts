import { NextRequest, NextResponse } from "next/server"

// Example: Switch between providers
async function callLLM(provider: string, prompt: string) {
  if (provider === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    })
    const data = await res.json()
    return data.choices[0].message.content
  }
  // Later: add Groq, Anthropic etc.
  return "Provider not implemented yet."
}

export async function POST(req: NextRequest) {
  try {
    const { message, provider } = await req.json()

    // ✅ TODO: Connect to Contentstack API here
    // Example: fetch tours for "Italy"

    const reply = await callLLM(provider || "openai", message)

    return NextResponse.json({ reply })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
