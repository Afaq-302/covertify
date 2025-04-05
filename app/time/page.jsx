"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function TimeConverter() {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [days, setDays] = useState("")
  const [weeks, setWeeks] = useState("")
  const [years, setYears] = useState("")

  // Handle hours changes
  const handleHoursChange = (e) => {
    const value = e.target.value
    setHours(value)

    if (value === "") {
      setMinutes("")
      setSeconds("")
      setDays("")
      setWeeks("")
      setYears("")
      return
    }

    const hoursValue = Number.parseFloat(value)
    setMinutes((hoursValue * 60).toString())
    setSeconds((hoursValue * 3600).toString())
    setDays((hoursValue / 24).toString())
    setWeeks((hoursValue / 168).toString())
    setYears((hoursValue / 8760).toString())
  }

  // Handle minutes changes
  const handleMinutesChange = (e) => {
    const value = e.target.value
    setMinutes(value)

    if (value === "") {
      setHours("")
      setSeconds("")
      setDays("")
      setWeeks("")
      setYears("")
      return
    }

    const minutesValue = Number.parseFloat(value)
    setHours((minutesValue / 60).toString())
    setSeconds((minutesValue * 60).toString())
    setDays((minutesValue / 1440).toString())
    setWeeks((minutesValue / 10080).toString())
    setYears((minutesValue / 525600).toString())
  }

  // Handle seconds changes
  const handleSecondsChange = (e) => {
    const value = e.target.value
    setSeconds(value)

    if (value === "") {
      setHours("")
      setMinutes("")
      setDays("")
      setWeeks("")
      setYears("")
      return
    }

    const secondsValue = Number.parseFloat(value)
    setHours((secondsValue / 3600).toString())
    setMinutes((secondsValue / 60).toString())
    setDays((secondsValue / 86400).toString())
    setWeeks((secondsValue / 604800).toString())
    setYears((secondsValue / 31536000).toString())
  }

  // Handle days changes
  const handleDaysChange = (e) => {
    const value = e.target.value
    setDays(value)

    if (value === "") {
      setHours("")
      setMinutes("")
      setSeconds("")
      setWeeks("")
      setYears("")
      return
    }

    const daysValue = Number.parseFloat(value)
    setHours((daysValue * 24).toString())
    setMinutes((daysValue * 1440).toString())
    setSeconds((daysValue * 86400).toString())
    setWeeks((daysValue / 7).toString())
    setYears((daysValue / 365.25).toString()) // Accounting for leap years
  }

  // Handle weeks changes
  const handleWeeksChange = (e) => {
    const value = e.target.value
    setWeeks(value)

    if (value === "") {
      setHours("")
      setMinutes("")
      setSeconds("")
      setDays("")
      setYears("")
      return
    }

    const weeksValue = Number.parseFloat(value)
    setHours((weeksValue * 168).toString())
    setMinutes((weeksValue * 10080).toString())
    setSeconds((weeksValue * 604800).toString())
    setDays((weeksValue * 7).toString())
    setYears((weeksValue / 52.1775).toString()) // Accounting for leap years
  }

  // Handle years changes
  const handleYearsChange = (e) => {
    const value = e.target.value
    setYears(value)

    if (value === "") {
      setHours("")
      setMinutes("")
      setSeconds("")
      setDays("")
      setWeeks("")
      return
    }

    const yearsValue = Number.parseFloat(value)
    setHours((yearsValue * 8760).toString())
    setMinutes((yearsValue * 525600).toString())
    setSeconds((yearsValue * 31536000).toString())
    setDays((yearsValue * 365.25).toString()) // Accounting for leap years
    setWeeks((yearsValue * 52.1775).toString()) // Accounting for leap years
  }

  return (
    <ToolLayout title="Time Converter" description="Convert between different time units" emoji="🕒">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Hours (h)" value={hours} onChange={handleHoursChange} unit="h" />
        <ConversionInput label="Minutes (min)" value={minutes} onChange={handleMinutesChange} unit="min" />
        <ConversionInput label="Seconds (s)" value={seconds} onChange={handleSecondsChange} unit="s" />
        <ConversionInput label="Days (d)" value={days} onChange={handleDaysChange} unit="d" />
        <ConversionInput label="Weeks (w)" value={weeks} onChange={handleWeeksChange} unit="w" />
        <ConversionInput label="Years (y)" value={years} onChange={handleYearsChange} unit="y" />
      </div>
    </ToolLayout>
  )
}

