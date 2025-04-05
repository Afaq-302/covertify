"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function SpeedConverter() {
  const [kmh, setKmh] = useState("")
  const [ms, setMs] = useState("")
  const [mph, setMph] = useState("")

  // Handle km/h changes
  const handleKmhChange = (e) => {
    const value = e.target.value
    setKmh(value)

    if (value === "") {
      setMs("")
      setMph("")
      return
    }

    const kmhValue = Number.parseFloat(value)
    setMs((kmhValue / 3.6).toString())
    setMph((kmhValue / 1.60934).toString())
  }

  // Handle m/s changes
  const handleMsChange = (e) => {
    const value = e.target.value
    setMs(value)

    if (value === "") {
      setKmh("")
      setMph("")
      return
    }

    const msValue = Number.parseFloat(value)
    setKmh((msValue * 3.6).toString())
    setMph((msValue * 2.23694).toString())
  }

  // Handle mph changes
  const handleMphChange = (e) => {
    const value = e.target.value
    setMph(value)

    if (value === "") {
      setKmh("")
      setMs("")
      return
    }

    const mphValue = Number.parseFloat(value)
    setKmh((mphValue * 1.60934).toString())
    setMs((mphValue * 0.44704).toString())
  }

  return (
    <ToolLayout title="Speed Converter" description="Convert between different speed units" emoji="🚗">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConversionInput label="Kilometers per hour (km/h)" value={kmh} onChange={handleKmhChange} unit="km/h" />
        <ConversionInput label="Meters per second (m/s)" value={ms} onChange={handleMsChange} unit="m/s" />
        <ConversionInput label="Miles per hour (mph)" value={mph} onChange={handleMphChange} unit="mph" />
      </div>
    </ToolLayout>
  )
}

