"use client"
import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")

  async function sendMessage() {
    if (!input.trim()) return
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, provider: "openai" })
    })
    const data = await res.json()

    setMessages([...newMessages, { role: "assistant", content: data.reply }])
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-4 py-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-800"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  )
}
