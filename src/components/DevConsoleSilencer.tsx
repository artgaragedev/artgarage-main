"use client"

import { useEffect } from "react"

// Dev-only console filter to silence noisy Next.js Fast Refresh logs
export default function DevConsoleSilencer() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    const originalInfo = console.info
    const originalLog = console.log

    const filter = (fn: (...args: any[]) => void) =>
      (...args: any[]) => {
        const first = args[0]
        if (typeof first === "string" && first.includes("[Fast Refresh]")) {
          return
        }
        fn(...args)
      }

    console.info = filter(originalInfo)
    console.log = filter(originalLog)

    return () => {
      console.info = originalInfo
      console.log = originalLog
    }
  }, [])

  return null
}