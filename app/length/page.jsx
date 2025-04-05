"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function LengthConverter() {
  const [meters, setMeters] = useState("")
  const [kilometers, setKilometers] = useState("")
  const [centimeters, setCentimeters] = useState("")
  const [millimeters, setMillimeters] = useState("")
  const [inches, setInches] = useState("")
  const [feet, setFeet] = useState("")
  const [miles, setMiles] = useState("")

  // Handle meters changes
  const handleMetersChange = (e) => {
    const value = e.target.value
    setMeters(value)

    if (value === "") {
      setKilometers("")
      setCentimeters("")
      setMillimeters("")
      setInches("")
      setFeet("")
      setMiles("")
      return
    }

    const metersValue = Number.parseFloat(value)
    setKilometers((metersValue / 1000).toString())
    setCentimeters((metersValue * 100).toString())
    setMillimeters((metersValue * 1000).toString())
    setInches((metersValue * 39.3701).toString())
    setFeet((metersValue * 3.28084).toString())
    setMiles((metersValue / 1609.34).toString())
  }

  // Handle kilometers changes
  const handleKilometersChange = (e) => {
    const value = e.target.value
    setKilometers(value)

    if (value === "") {
      setMeters("")
      setCentimeters("")
      setMillimeters("")
      setInches("")
      setFeet("")
      setMiles("")
      return
    }

    const kilometersValue = Number.parseFloat(value)
    setMeters((kilometersValue * 1000).toString())
    setCentimeters((kilometersValue * 100000).toString())
    setMillimeters((kilometersValue * 1000000).toString())
    setInches((kilometersValue * 39370.1).toString())
    setFeet((kilometersValue * 3280.84).toString())
    setMiles((kilometersValue / 1.60934).toString())
  }

  // Handle centimeters changes
  const handleCentimetersChange = (e) => {
    const value = e.target.value
    setCentimeters(value)

    if (value === "") {
      setMeters("")
      setKilometers("")
      setMillimeters("")
      setInches("")
      setFeet("")
      setMiles("")
      return
    }

    const centimetersValue = Number.parseFloat(value)
    setMeters((centimetersValue / 100).toString())
    setKilometers((centimetersValue / 100000).toString())
    setMillimeters((centimetersValue * 10).toString())
    setInches((centimetersValue / 2.54).toString())
    setFeet((centimetersValue / 30.48).toString())
    setMiles((centimetersValue / 160934).toString())
  }

  // Handle millimeters changes
  const handleMillimetersChange = (e) => {
    const value = e.target.value
    setMillimeters(value)

    if (value === "") {
      setMeters("")
      setKilometers("")
      setCentimeters("")
      setInches("")
      setFeet("")
      setMiles("")
      return
    }

    const millimetersValue = Number.parseFloat(value)
    setMeters((millimetersValue / 1000).toString())
    setKilometers((millimetersValue / 1000000).toString())
    setCentimeters((millimetersValue / 10).toString())
    setInches((millimetersValue / 25.4).toString())
    setFeet((millimetersValue / 304.8).toString())
    setMiles((millimetersValue / 1609340).toString())
  }

  // Handle inches changes
  const handleInchesChange = (e) => {
    const value = e.target.value
    setInches(value)

    if (value === "") {
      setMeters("")
      setKilometers("")
      setCentimeters("")
      setMillimeters("")
      setFeet("")
      setMiles("")
      return
    }

    const inchesValue = Number.parseFloat(value)
    setMeters((inchesValue / 39.3701).toString())
    setKilometers((inchesValue / 39370.1).toString())
    setCentimeters((inchesValue * 2.54).toString())
    setMillimeters((inchesValue * 25.4).toString())
    setFeet((inchesValue / 12).toString())
    setMiles((inchesValue / 63360).toString())
  }

  // Handle feet changes
  const handleFeetChange = (e) => {
    const value = e.target.value
    setFeet(value)

    if (value === "") {
      setMeters("")
      setKilometers("")
      setCentimeters("")
      setMillimeters("")
      setInches("")
      setMiles("")
      return
    }

    const feetValue = Number.parseFloat(value)
    setMeters((feetValue / 3.28084).toString())
    setKilometers((feetValue / 3280.84).toString())
    setCentimeters((feetValue * 30.48).toString())
    setMillimeters((feetValue * 304.8).toString())
    setInches((feetValue * 12).toString())
    setMiles((feetValue / 5280).toString())
  }

  // Handle miles changes
  const handleMilesChange = (e) => {
    const value = e.target.value
    setMiles(value)

    if (value === "") {
      setMeters("")
      setKilometers("")
      setCentimeters("")
      setMillimeters("")
      setInches("")
      setFeet("")
      return
    }

    const milesValue = Number.parseFloat(value)
    setMeters((milesValue * 1609.34).toString())
    setKilometers((milesValue * 1.60934).toString())
    setCentimeters((milesValue * 160934).toString())
    setMillimeters((milesValue * 1609340).toString())
    setInches((milesValue * 63360).toString())
    setFeet((milesValue * 5280).toString())
  }

  return (
    <ToolLayout
      title="Length / Distance Converter"
      description="Convert between different length and distance units"
      emoji="📏"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Meters (m)" value={meters} onChange={handleMetersChange} unit="m" />
        <ConversionInput label="Kilometers (km)" value={kilometers} onChange={handleKilometersChange} unit="km" />
        <ConversionInput label="Centimeters (cm)" value={centimeters} onChange={handleCentimetersChange} unit="cm" />
        <ConversionInput label="Millimeters (mm)" value={millimeters} onChange={handleMillimetersChange} unit="mm" />
        <ConversionInput label="Inches (in)" value={inches} onChange={handleInchesChange} unit="in" />
        <ConversionInput label="Feet (ft)" value={feet} onChange={handleFeetChange} unit="ft" />
        <ConversionInput label="Miles (mi)" value={miles} onChange={handleMilesChange} unit="mi" />
      </div>
    </ToolLayout>
  )
}

