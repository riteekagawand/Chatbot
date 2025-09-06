# ChatBot 🤖  
*A plug-and-play Chat Agent Platform for Contentstack-powered Websites*

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) 
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/) 
[![Contentstack](https://img.shields.io/badge/Contentstack-CMS-orange)](https://www.contentstack.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 Overview
**ChatStack** is a developer-friendly platform that makes it effortless to add AI-powered chatbots to websites and apps using **Contentstack CMS**.  

Instead of building chat logic, LLM integration, and CMS connections from scratch, developers can simply:  
1. Connect their **Contentstack stack**.  
2. Choose an **LLM provider** (Groq, OpenAI, Anthropic, etc.).  
3. Drop in our **Chat SDK**.  

And voilà — a chatbot that responds with **real-time CMS content** is ready in minutes. 🚀  

---

## 🎯 Problem Statement
Building a chatbot that integrates with Contentstack CMS is complex. Developers must:  
- Understand **LLMs** and APIs.  
- Fetch **structured content** from Contentstack Delivery APIs.  
- Handle **frontend integration** with React.  

**ChatStack solves this by providing:**  
- A **Backend API** → connects LLMs with Contentstack CMS.  
- A **Chat SDK** → lightweight React hooks & components.  
- An **Embed-Ready Chat UI** → works on any website instantly.  

---

## 🏗️ Architecture
End User (Website)
│
▼
Chat SDK (React Hooks & UI)
│
▼
Chat Backend API
├─► LLM Providers (Groq, OpenAI, Anthropic)
└─► Contentstack CMS (via Delivery API & MCP)


---

## ⚙️ Features
- 🔌 **Plug-and-play SDK** for React/Next.js  
- 🤖 **Multi-LLM support** (Groq, OpenAI, Anthropic)  
- 📦 **CMS-driven responses** (Contentstack Delivery API)  
- ⚡ **Streaming replies** for real-time experience  
- 🛠️ **Developer-friendly API** with minimal setup  

---

## 🚀 Getting Started

### 1️⃣ Setup Contentstack
1. Create a new **stack** in Contentstack.  
2. Define **Content Models** (e.g., Tours, FAQs, Blogs).  
3. Add sample entries.  
4. Get your **Delivery Token** and **API Key**.  

---

### 2️⃣ Run Backend
```bash
# Clone the repo
git clone https://github.com/riteekagawand/Chatbot.git
cd Chatbot/backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Add OPENAI_KEY, GROQ_KEY, CONTENTSTACK_API_KEY, DELIVERY_TOKEN

# Start server
npm run dev
```

---

### 3️⃣ Use SDK in Frontend
# Install SDK
```bash
npm install chatstack-sdk
```
```bash
import { ChatAgent } from "chatstack-sdk";

export default function App() {
  return <ChatAgent apiKey="YOUR_CONTENTSTACK_API_KEY" />;
}
```

---

### 4️⃣ Try It Out 🎉
- Open your frontend app.
- Ask the chatbot: “What tours are available in Italy?”
- It will fetch structured content from Contentstack and reply naturally.

---

## 📂 Project Structure
```bash
chatstack/
├── backend/        # API server (Node.js/Express)
├── sdk/            # React SDK (hooks + ChatAgent component)
├── frontend/       # Example Next.js site using SDK
└── README.md
```
---

## 🛠️ Tech Stack

- Backend: Node.js (Express) / LangChain
- Frontend SDK: React + Hooks
- CMS: Contentstack (Delivery API, MCP)
- LLMs: Groq / OpenAI / Anthropic

---
## 🎥 Demo
 ▶️ [Add link here once hosted on Vercel/Netlify]

---

## 📜 License
MIT License © 2025 Riteeka Janardan Gawand

---

## 🙌 Acknowledgements

- Contentstack
- Groq
- OpenAI
- LangChain