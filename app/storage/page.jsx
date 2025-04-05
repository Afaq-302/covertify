"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import ConversionInput from "@/components/ConversionInput"

export default function StorageConverter() {
  const [bits, setBits] = useState("")
  const [bytes, setBytes] = useState("")
  const [kilobytes, setKilobytes] = useState("")
  const [megabytes, setMegabytes] = useState("")
  const [gigabytes, setGigabytes] = useState("")
  const [terabytes, setTerabytes] = useState("")

  // Handle bits changes
  const handleBitsChange = (e) => {
    const value = e.target.value
    setBits(value)

    if (value === "") {
      setBytes("")
      setKilobytes("")
      setMegabytes("")
      setGigabytes("")
      setTerabytes("")
      return
    }

    const bitsValue = Number.parseFloat(value)
    setBytes((bitsValue / 8).toString())
    setKilobytes((bitsValue / 8 / 1024).toString())
    setMegabytes((bitsValue / 8 / 1024 / 1024).toString())
    setGigabytes((bitsValue / 8 / 1024 / 1024 / 1024).toString())
    setTerabytes((bitsValue / 8 / 1024 / 1024 / 1024 / 1024).toString())
  }

  // Handle bytes changes
  const handleBytesChange = (e) => {
    const value = e.target.value
    setBytes(value)

    if (value === "") {
      setBits("")
      setKilobytes("")
      setMegabytes("")
      setGigabytes("")
      setTerabytes("")
      return
    }

    const bytesValue = Number.parseFloat(value)
    setBits((bytesValue * 8).toString())
    setKilobytes((bytesValue / 1024).toString())
    setMegabytes((bytesValue / 1024 / 1024).toString())
    setGigabytes((bytesValue / 1024 / 1024 / 1024).toString())
    setTerabytes((bytesValue / 1024 / 1024 / 1024 / 1024).toString())
  }

  // Handle kilobytes changes
  const handleKilobytesChange = (e) => {
    const value = e.target.value
    setKilobytes(value)

    if (value === "") {
      setBits("")
      setBytes("")
      setMegabytes("")
      setGigabytes("")
      setTerabytes("")
      return
    }

    const kilobytesValue = Number.parseFloat(value)
    setBits((kilobytesValue * 1024 * 8).toString())
    setBytes((kilobytesValue * 1024).toString())
    setMegabytes((kilobytesValue / 1024).toString())
    setGigabytes((kilobytesValue / 1024 / 1024).toString())
    setTerabytes((kilobytesValue / 1024 / 1024 / 1024).toString())
  }

  // Handle megabytes changes
  const handleMegabytesChange = (e) => {
    const value = e.target.value
    setMegabytes(value)

    if (value === "") {
      setBits("")
      setBytes("")
      setKilobytes("")
      setGigabytes("")
      setTerabytes("")
      return
    }

    const megabytesValue = Number.parseFloat(value)
    setBits((megabytesValue * 1024 * 1024 * 8).toString())
    setBytes((megabytesValue * 1024 * 1024).toString())
    setKilobytes((megabytesValue * 1024).toString())
    setGigabytes((megabytesValue / 1024).toString())
    setTerabytes((megabytesValue / 1024 / 1024).toString())
  }

  // Handle gigabytes changes
  const handleGigabytesChange = (e) => {
    const value = e.target.value
    setGigabytes(value)

    if (value === "") {
      setBits("")
      setBytes("")
      setKilobytes("")
      setMegabytes("")
      setTerabytes("")
      return
    }

    const gigabytesValue = Number.parseFloat(value)
    setBits((gigabytesValue * 1024 * 1024 * 1024 * 8).toString())
    setBytes((gigabytesValue * 1024 * 1024 * 1024).toString())
    setKilobytes((gigabytesValue * 1024 * 1024).toString())
    setMegabytes((gigabytesValue * 1024).toString())
    setTerabytes((gigabytesValue / 1024).toString())
  }

  // Handle terabytes changes
  const handleTerabytesChange = (e) => {
    const value = e.target.value
    setTerabytes(value)

    if (value === "") {
      setBits("")
      setBytes("")
      setKilobytes("")
      setMegabytes("")
      setGigabytes("")
      return
    }

    const terabytesValue = Number.parseFloat(value)
    setBits((terabytesValue * 1024 * 1024 * 1024 * 1024 * 8).toString())
    setBytes((terabytesValue * 1024 * 1024 * 1024 * 1024).toString())
    setKilobytes((terabytesValue * 1024 * 1024 * 1024).toString())
    setMegabytes((terabytesValue * 1024 * 1024).toString())
    setGigabytes((terabytesValue * 1024).toString())
  }

  return (
    <ToolLayout
      title="Digital Storage Converter"
      description="Convert between different digital storage units"
      emoji="💾"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionInput label="Bits (b)" value={bits} onChange={handleBitsChange} unit="b" />
        <ConversionInput label="Bytes (B)" value={bytes} onChange={handleBytesChange} unit="B" />
        <ConversionInput label="Kilobytes (KB)" value={kilobytes} onChange={handleKilobytesChange} unit="KB" />
        <ConversionInput label="Megabytes (MB)" value={megabytes} onChange={handleMegabytesChange} unit="MB" />
        <ConversionInput label="Gigabytes (GB)" value={gigabytes} onChange={handleGigabytesChange} unit="GB" />
        <ConversionInput label="Terabytes (TB)" value={terabytes} onChange={handleTerabytesChange} unit="TB" />
      </div>
    </ToolLayout>
  )
}

