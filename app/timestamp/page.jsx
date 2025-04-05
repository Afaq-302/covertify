"use client"

import { useState, useEffect } from "react"
import ToolLayout from "@/components/ToolLayout"

export default function TimestampConverter() {
  const [unixTimestamp, setUnixTimestamp] = useState("")
  const [humanDate, setHumanDate] = useState("")
  const [currentTimestamp, setCurrentTimestamp] = useState("")

  useEffect(() => {
    // Set current timestamp on load
    const now = Math.floor(Date.now() / 1000)
    setCurrentTimestamp(now)
  }, [])

  const handleUnixTimestampChange = (e) => {
    const value = e.target.value
    setUnixTimestamp(value)

    if (value === "") {
      setHumanDate("")
      return
    }

    try {
      const date = new Date(Number.parseInt(value) * 1000)
      setHumanDate(date.toISOString())
    } catch (error) {
      setHumanDate("Invalid timestamp")
    }
  }

  const handleHumanDateChange = (e) => {
    const value = e.target.value
    setHumanDate(value)

    if (value === "") {
      setUnixTimestamp("")
      return
    }

    try {
      const timestamp = Math.floor(new Date(value).getTime() / 1000)
      if (isNaN(timestamp)) {
        setUnixTimestamp("Invalid date")
      } else {
        setUnixTimestamp(timestamp.toString())
      }
    } catch (error) {
      setUnixTimestamp("Invalid date")
    }
  }

  const setNow = () => {
    const now = new Date()
    setUnixTimestamp(Math.floor(now.getTime() / 1000).toString())
    setHumanDate(now.toISOString())
  }

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates"
      emoji="📅"
    >
      <div className="space-y-6">
        <div className="text-center mb-4">
          <button
            onClick={setNow}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Use Current Time
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unix Timestamp (seconds)</label>
            <input
              type="text"
              value={unixTimestamp}
              onChange={handleUnixTimestampChange}
              placeholder="e.g., 1617184800"
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
            <p className="mt-1 text-xs text-gray-500">Current timestamp: {currentTimestamp}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Human-Readable Date (ISO)</label>
            <input
              type="text"
              value={humanDate}
              onChange={handleHumanDateChange}
              placeholder="e.g., 2023-04-01T00:00:00.000Z"
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
          </div>
        </div>

        {unixTimestamp && !isNaN(Number.parseInt(unixTimestamp)) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Formatted Date/Time:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Local Date:</p>
                <p className="text-sm">{new Date(Number.parseInt(unixTimestamp) * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Local Time:</p>
                <p className="text-sm">{new Date(Number.parseInt(unixTimestamp) * 1000).toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">UTC Date:</p>
                <p className="text-sm">{new Date(Number.parseInt(unixTimestamp) * 1000).toUTCString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Relative Time:</p>
                <p className="text-sm">{getRelativeTime(Number.parseInt(unixTimestamp) * 1000)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

function getRelativeTime(timestamp) {
  const now = Date.now()
  const diff = timestamp - now
  const seconds = Math.floor(Math.abs(diff) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (diff > 0) {
    // Future
    if (days > 0) return `In ${days} day${days > 1 ? "s" : ""}`
    if (hours > 0) return `In ${hours} hour${hours > 1 ? "s" : ""}`
    if (minutes > 0) return `In ${minutes} minute${minutes > 1 ? "s" : ""}`
    return `In ${seconds} second${seconds > 1 ? "s" : ""}`
  } else {
    // Past
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`
  }
}

