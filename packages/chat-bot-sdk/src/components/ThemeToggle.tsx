"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
      setDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      setDark(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 px-4 py-2 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}
