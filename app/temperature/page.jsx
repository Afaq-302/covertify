"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("")
  const [fahrenheit, setFahrenheit] = useState("")
  const [kelvin, setKelvin] = useState("")

  // Handle Celsius changes
  const handleCelsiusChange = (e) => {
    const value = e.target.value
    setCelsius(value)

    if (value === "") {
      setFahrenheit("")
      setKelvin("")
      return
    }

    const celsiusValue = Number.parseFloat(value)
    setFahrenheit(((celsiusValue * 9) / 5 + 32).toFixed(2))
    setKelvin((celsiusValue + 273.15).toFixed(2))
  }

  // Handle Fahrenheit changes
  const handleFahrenheitChange = (e) => {
    const value = e.target.value
    setFahrenheit(value)

    if (value === "") {
      setCelsius("")
      setKelvin("")
      return
    }

    const fahrenheitValue = Number.parseFloat(value)
    setCelsius((((fahrenheitValue - 32) * 5) / 9).toFixed(2))
    setKelvin((((fahrenheitValue - 32) * 5) / 9 + 273.15).toFixed(2))
  }

  // Handle Kelvin changes
  const handleKelvinChange = (e) => {
    const value = e.target.value
    setKelvin(value)

    if (value === "") {
      setCelsius("")
      setFahrenheit("")
      return
    }

    const kelvinValue = Number.parseFloat(value)
    setCelsius((kelvinValue - 273.15).toFixed(2))
    setFahrenheit((((kelvinValue - 273.15) * 9) / 5 + 32).toFixed(2))
  }

  return (
    <ToolLayout title="Temperature Converter" description="Convert between Celsius, Fahrenheit, and Kelvin" emoji="🌡️">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConversionInput label="Celsius (°C)" value={celsius} onChange={handleCelsiusChange} unit="°C" />
        <ConversionInput label="Fahrenheit (°F)" value={fahrenheit} onChange={handleFahrenheitChange} unit="°F" />
        <ConversionInput label="Kelvin (K)" value={kelvin} onChange={handleKelvinChange} unit="K" />
      </div>
    </ToolLayout>
  )
}

