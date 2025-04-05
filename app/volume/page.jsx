"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function VolumeConverter() {
  const [liters, setLiters] = useState("")
  const [milliliters, setMilliliters] = useState("")
  const [gallons, setGallons] = useState("")
  const [cubicMeters, setCubicMeters] = useState("")
  const [cups, setCups] = useState("")

  // Handle liters changes
  const handleLitersChange = (e) => {
    const value = e.target.value
    setLiters(value)

    if (value === "") {
      setMilliliters("")
      setGallons("")
      setCubicMeters("")
      setCups("")
      return
    }

    const litersValue = Number.parseFloat(value)
    setMilliliters((litersValue * 1000).toString())
    setGallons((litersValue * 0.264172).toString())
    setCubicMeters((litersValue / 1000).toString())
    setCups((litersValue * 4.22675).toString())
  }

  // Handle milliliters changes
  const handleMillilitersChange = (e) => {
    const value = e.target.value
    setMilliliters(value)

    if (value === "") {
      setLiters("")
      setGallons("")
      setCubicMeters("")
      setCups("")
      return
    }

    const millilitersValue = Number.parseFloat(value)
    setLiters((millilitersValue / 1000).toString())
    setGallons((millilitersValue * 0.000264172).toString())
    setCubicMeters((millilitersValue / 1000000).toString())
    setCups((millilitersValue * 0.00422675).toString())
  }

  // Handle gallons changes
  const handleGallonsChange = (e) => {
    const value = e.target.value
    setGallons(value)

    if (value === "") {
      setLiters("")
      setMilliliters("")
      setCubicMeters("")
      setCups("")
      return
    }

    const gallonsValue = Number.parseFloat(value)
    setLiters((gallonsValue * 3.78541).toString())
    setMilliliters((gallonsValue * 3785.41).toString())
    setCubicMeters((gallonsValue * 0.00378541).toString())
    setCups((gallonsValue * 16).toString())
  }

  // Handle cubic meters changes
  const handleCubicMetersChange = (e) => {
    const value = e.target.value
    setCubicMeters(value)

    if (value === "") {
      setLiters("")
      setMilliliters("")
      setGallons("")
      setCups("")
      return
    }

    const cubicMetersValue = Number.parseFloat(value)
    setLiters((cubicMetersValue * 1000).toString())
    setMilliliters((cubicMetersValue * 1000000).toString())
    setGallons((cubicMetersValue * 264.172).toString())
    setCups((cubicMetersValue * 4226.75).toString())
  }

  // Handle cups changes
  const handleCupsChange = (e) => {
    const value = e.target.value
    setCups(value)

    if (value === "") {
      setLiters("")
      setMilliliters("")
      setGallons("")
      setCubicMeters("")
      return
    }

    const cupsValue = Number.parseFloat(value)
    setLiters((cupsValue * 0.236588).toString())
    setMilliliters((cupsValue * 236.588).toString())
    setGallons((cupsValue * 0.0625).toString())
    setCubicMeters((cupsValue * 0.000236588).toString())
  }

  return (
    <ToolLayout title="Volume Converter" description="Convert between different volume units" emoji="🧪">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Liters (L)" value={liters} onChange={handleLitersChange} unit="L" />
        <ConversionInput label="Milliliters (mL)" value={milliliters} onChange={handleMillilitersChange} unit="mL" />
        <ConversionInput label="Gallons (US) (gal)" value={gallons} onChange={handleGallonsChange} unit="gal" />
        <ConversionInput label="Cubic Meters (m³)" value={cubicMeters} onChange={handleCubicMetersChange} unit="m³" />
        <ConversionInput label="Cups (cup)" value={cups} onChange={handleCupsChange} unit="cup" />
      </div>
    </ToolLayout>
  )
}

