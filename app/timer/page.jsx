"use client"

import { useState, useEffect, useRef } from "react"
import ToolLayout from "@/components/ToolLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function TimerTools() {
  return (
    <ToolLayout title="Timer Tools" description="Stopwatch and countdown timer" emoji="⏱️">
      <Tabs defaultValue="stopwatch">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
          <TabsTrigger value="countdown">Countdown Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="stopwatch">
          <Stopwatch />
        </TabsContent>

        <TabsContent value="countdown">
          <CountdownTimer />
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startStopwatch = () => {
    if (isRunning) return

    setIsRunning(true)
    const startTime = Date.now() - time

    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime)
    }, 10)
  }

  const pauseStopwatch = () => {
    if (!isRunning) return

    clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  const resetStopwatch = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const addLap = () => {
    if (!isRunning) return

    setLaps([...laps, time])
  }

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10)
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / (1000 * 60)) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60))

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6 py-4">
      <div className="text-center">
        <div className="text-6xl font-mono font-bold mb-6">{formatTime(time)}</div>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <Button onClick={startStopwatch}>Start</Button>
          ) : (
            <Button onClick={pauseStopwatch} variant="outline">
              Pause
            </Button>
          )}
          <Button onClick={resetStopwatch} variant="outline">
            Reset
          </Button>
          <Button onClick={addLap} disabled={!isRunning}>
            Lap
          </Button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Laps</h3>
          <div className="bg-gray-50 rounded-md p-4">
            <ul className="space-y-2">
              {laps.map((lap, index) => (
                <li key={index} className="flex justify-between">
                  <span>Lap {index + 1}</span>
                  <span className="font-mono">{formatTime(lap)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function CountdownTimer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3") // This would be a real audio file in a real app

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startTimer = () => {
    if (isRunning) return

    const total = hours * 3600 + minutes * 60 + seconds
    if (total <= 0) return

    setTotalSeconds(total)
    setIsRunning(true)
    setIsPaused(false)

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          // Play alarm sound
          if (audioRef.current) {
            audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    if (!isRunning) return

    clearInterval(intervalRef.current)
    setIsPaused(true)
    setIsRunning(false)
  }

  const resumeTimer = () => {
    if (!isPaused) return

    setIsRunning(true)
    setIsPaused(false)

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          // Play alarm sound
          if (audioRef.current) {
            audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setIsPaused(false)
    setTotalSeconds(0)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  const formatTimeDisplay = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleHoursChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    setHours(Math.max(0, Math.min(99, value)))
  }

  const handleMinutesChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    setMinutes(Math.max(0, Math.min(59, value)))
  }

  const handleSecondsChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    setSeconds(Math.max(0, Math.min(59, value)))
  }

  // Quick preset buttons
  const setPreset = (totalSeconds) => {
    resetTimer()
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60

    setHours(h)
    setMinutes(m)
    setSeconds(s)
  }

  return (
    <div className="space-y-6 py-4">
      {!isRunning && !isPaused ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={handleHoursChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={handleMinutesChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={handleSecondsChange}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setPreset(60)} variant="outline" size="sm">
              1 min
            </Button>
            <Button onClick={() => setPreset(300)} variant="outline" size="sm">
              5 min
            </Button>
            <Button onClick={() => setPreset(600)} variant="outline" size="sm">
              10 min
            </Button>
            <Button onClick={() => setPreset(1800)} variant="outline" size="sm">
              30 min
            </Button>
            <Button onClick={() => setPreset(3600)} variant="outline" size="sm">
              1 hour
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl font-mono font-bold mb-6">{formatTimeDisplay(totalSeconds)}</div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {!isRunning && !isPaused && (
          <Button onClick={startTimer} disabled={hours === 0 && minutes === 0 && seconds === 0}>
            Start
          </Button>
        )}
        {isRunning && (
          <Button onClick={pauseTimer} variant="outline">
            Pause
          </Button>
        )}
        {isPaused && <Button onClick={resumeTimer}>Resume</Button>}
        {(isRunning || isPaused) && (
          <Button onClick={resetTimer} variant="outline">
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}

