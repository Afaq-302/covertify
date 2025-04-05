"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function WeightConverter() {
  const [kg, setKg] = useState("")
  const [g, setG] = useState("")
  const [lb, setLb] = useState("")
  const [oz, setOz] = useState("")
  const [ton, setTon] = useState("")

  // Handle kg changes
  const handleKgChange = (e) => {
    const value = e.target.value
    setKg(value)

    if (value === "") {
      setG("")
      setLb("")
      setOz("")
      setTon("")
      return
    }

    const kgValue = Number.parseFloat(value)
    setG((kgValue * 1000).toString())
    setLb((kgValue * 2.20462).toString())
    setOz((kgValue * 35.274).toString())
    setTon((kgValue / 1000).toString())
  }

  // Handle g changes
  const handleGChange = (e) => {
    const value = e.target.value
    setG(value)

    if (value === "") {
      setKg("")
      setLb("")
      setOz("")
      setTon("")
      return
    }

    const gValue = Number.parseFloat(value)
    setKg((gValue / 1000).toString())
    setLb((gValue / 453.592).toString())
    setOz((gValue / 28.3495).toString())
    setTon((gValue / 1000000).toString())
  }

  // Handle lb changes
  const handleLbChange = (e) => {
    const value = e.target.value
    setLb(value)

    if (value === "") {
      setKg("")
      setG("")
      setOz("")
      setTon("")
      return
    }

    const lbValue = Number.parseFloat(value)
    setKg((lbValue / 2.20462).toString())
    setG((lbValue * 453.592).toString())
    setOz((lbValue * 16).toString())
    setTon((lbValue / 2204.62).toString())
  }

  // Handle oz changes
  const handleOzChange = (e) => {
    const value = e.target.value
    setOz(value)

    if (value === "") {
      setKg("")
      setG("")
      setLb("")
      setTon("")
      return
    }

    const ozValue = Number.parseFloat(value)
    setKg((ozValue / 35.274).toString())
    setG((ozValue * 28.3495).toString())
    setLb((ozValue / 16).toString())
    setTon((ozValue / 35274).toString())
  }

  // Handle ton changes
  const handleTonChange = (e) => {
    const value = e.target.value
    setTon(value)

    if (value === "") {
      setKg("")
      setG("")
      setLb("")
      setOz("")
      return
    }

    const tonValue = Number.parseFloat(value)
    setKg((tonValue * 1000).toString())
    setG((tonValue * 1000000).toString())
    setLb((tonValue * 2204.62).toString())
    setOz((tonValue * 35274).toString())
  }

  return (
    <ToolLayout title="Weight / Mass Converter" description="Convert between different weight and mass units" emoji="⚖️">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Kilograms (kg)" value={kg} onChange={handleKgChange} unit="kg" />
        <ConversionInput label="Grams (g)" value={g} onChange={handleGChange} unit="g" />
        <ConversionInput label="Pounds (lb)" value={lb} onChange={handleLbChange} unit="lb" />
        <ConversionInput label="Ounces (oz)" value={oz} onChange={handleOzChange} unit="oz" />
        <ConversionInput label="Metric Tons (t)" value={ton} onChange={handleTonChange} unit="t" />
      </div>
    </ToolLayout>
  )
}

