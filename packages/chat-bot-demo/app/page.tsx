import ThemeToggle from "@/components/ThemeToggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 border-b border-gray-300 dark:border-gray-800">
        <h1 className="text-2xl font-bold">MyProject</h1>
        <div className="flex items-center">
          <ul className="flex gap-6">
            <li><a href="/" className="hover:text-gray-500 dark:hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-500 dark:hover:text-gray-400">About</a></li>
            <li><a href="/contact" className="hover:text-gray-500 dark:hover:text-gray-400">Contact</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to My Project 🚀</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          This is a starter template with Next.js 15 and Tailwind CSS v4.
          You can build modern, responsive apps with ease.
        </p>
        <button className="mt-8 px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg shadow-md hover:opacity-80">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MyProject. All rights reserved.
      </footer>
    </div>
  )
}
