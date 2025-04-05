"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function EnergyConverter() {
  const [joules, setJoules] = useState("")
  const [calories, setCalories] = useState("")
  const [kilowattHours, setKilowattHours] = useState("")
  const [watts, setWatts] = useState("")
  const [horsepower, setHorsepower] = useState("")

  // Handle joules changes
  const handleJoulesChange = (e) => {
    const value = e.target.value
    setJoules(value)

    if (value === "") {
      setCalories("")
      setKilowattHours("")
      setWatts("")
      setHorsepower("")
      return
    }

    const joulesValue = Number.parseFloat(value)
    setCalories((joulesValue / 4.184).toString())
    setKilowattHours((joulesValue / 3600000).toString())
    // For watts, we need a time component. Let's assume 1 second for power
    setWatts(joulesValue.toString())
    setHorsepower((joulesValue / 745.7).toString())
  }

  // Handle calories changes
  const handleCaloriesChange = (e) => {
    const value = e.target.value
    setCalories(value)

    if (value === "") {
      setJoules("")
      setKilowattHours("")
      setWatts("")
      setHorsepower("")
      return
    }

    const caloriesValue = Number.parseFloat(value)
    setJoules((caloriesValue * 4.184).toString())
    setKilowattHours(((caloriesValue * 4.184) / 3600000).toString())
    // For watts, we need a time component. Let's assume 1 second for power
    setWatts((caloriesValue * 4.184).toString())
    setHorsepower(((caloriesValue * 4.184) / 745.7).toString())
  }

  // Handle kilowatt-hours changes
  const handleKilowattHoursChange = (e) => {
    const value = e.target.value
    setKilowattHours(value)

    if (value === "") {
      setJoules("")
      setCalories("")
      setWatts("")
      setHorsepower("")
      return
    }

    const kilowattHoursValue = Number.parseFloat(value)
    setJoules((kilowattHoursValue * 3600000).toString())
    setCalories(((kilowattHoursValue * 3600000) / 4.184).toString())
    // For watts, we need a time component. Let's assume 1 hour for kilowatt-hours
    setWatts((kilowattHoursValue * 1000).toString())
    setHorsepower(((kilowattHoursValue * 1000) / 0.7457).toString())
  }

  // Handle watts changes
  const handleWattsChange = (e) => {
    const value = e.target.value
    setWatts(value)

    if (value === "") {
      setJoules("")
      setCalories("")
      setKilowattHours("")
      setHorsepower("")
      return
    }

    const wattsValue = Number.parseFloat(value)
    // For joules, we need a time component. Let's assume 1 second for power
    setJoules(wattsValue.toString())
    setCalories((wattsValue / 4.184).toString())
    // For kilowatt-hours, we need a time component. Let's assume 1 hour
    setKilowattHours((wattsValue / 1000).toString())
    setHorsepower((wattsValue / 745.7).toString())
  }

  // Handle horsepower changes
  const handleHorsepowerChange = (e) => {
    const value = e.target.value
    setHorsepower(value)

    if (value === "") {
      setJoules("")
      setCalories("")
      setKilowattHours("")
      setWatts("")
      return
    }

    const horsepowerValue = Number.parseFloat(value)
    // For joules, we need a time component. Let's assume 1 second for power
    setJoules((horsepowerValue * 745.7).toString())
    setCalories(((horsepowerValue * 745.7) / 4.184).toString())
    // For kilowatt-hours, we need a time component. Let's assume 1 hour
    setKilowattHours((horsepowerValue * 0.7457).toString())
    setWatts((horsepowerValue * 745.7).toString())
  }

  return (
    <ToolLayout
      title="Energy / Power Converter"
      description="Convert between different energy and power units"
      emoji="⚡"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Joules (J)" value={joules} onChange={handleJoulesChange} unit="J" />
        <ConversionInput label="Calories (cal)" value={calories} onChange={handleCaloriesChange} unit="cal" />
        <ConversionInput
          label="Kilowatt-hours (kWh)"
          value={kilowattHours}
          onChange={handleKilowattHoursChange}
          unit="kWh"
        />
        <ConversionInput label="Watts (W)" value={watts} onChange={handleWattsChange} unit="W" />
        <ConversionInput label="Horsepower (hp)" value={horsepower} onChange={handleHorsepowerChange} unit="hp" />
      </div>
    </ToolLayout>
  )
}

