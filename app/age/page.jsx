"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [age, setAge] = useState(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    // Adjust for negative months or days
    if (days < 0) {
      // Get the last day of the previous month
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
      months--
    }

    if (months < 0) {
      months += 12
      years--
    }

    // Calculate total values
    const totalMonths = years * 12 + months
    const totalWeeks = Math.floor((today - birth) / (7 * 24 * 60 * 60 * 1000))
    const totalDays = Math.floor((today - birth) / (24 * 60 * 60 * 1000))
    const totalHours = Math.floor((today - birth) / (60 * 60 * 1000))
    const totalMinutes = Math.floor((today - birth) / (60 * 1000))
    const totalSeconds = Math.floor((today - birth) / 1000)

    setAge({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    })
  }

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value)
    setAge(null)
  }

  return (
    <ToolLayout title="Age Calculator" description="Calculate your exact age based on your date of birth" emoji="🎂">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculateAge}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            disabled={!birthDate}
          >
            Calculate Age
          </button>
        </div>

        {age && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Your Age</h3>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-xl font-bold">
                {age.years} years, {age.months} months, and {age.days} days
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Months</div>
                <div className="text-xl font-bold">{age.totalMonths.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Weeks</div>
                <div className="text-xl font-bold">{age.totalWeeks.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Days</div>
                <div className="text-xl font-bold">{age.totalDays.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Hours</div>
                <div className="text-xl font-bold">{age.totalHours.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Minutes</div>
                <div className="text-xl font-bold">{age.totalMinutes.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-500">Total Seconds</div>
                <div className="text-xl font-bold">{age.totalSeconds.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

