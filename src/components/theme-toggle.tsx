import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const selectedTheme = localStorage.getItem("theme")
      if (selectedTheme) return selectedTheme === "dark"
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    } catch {}
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      className="px-3 py-1 rounded border"
      aria-pressed={isDark}
    >
      {isDark ? "Dark Mode" : "Light Mode"}
    </button>
  )
}