"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function RandomGenerators() {
  const { toast } = useToast()

  // Password Generator State
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [generatedPassword, setGeneratedPassword] = useState("")

  // Name Generator State
  const [nameCount, setNameCount] = useState(5)
  const [nameGender, setNameGender] = useState("any")
  const [generatedNames, setGeneratedNames] = useState([])

  // Password Generator Functions
  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let password = ""
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }

    setGeneratedPassword(password)
  }

  const copyPassword = () => {
    if (!generatedPassword) return

    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Password copied to clipboard",
        })
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy password",
          variant: "destructive",
        })
      })
  }

  // Name Generator Functions
  const generateNames = () => {
    const firstNamesMale = [
      "James",
      "John",
      "Robert",
      "Michael",
      "William",
      "David",
      "Richard",
      "Joseph",
      "Thomas",
      "Charles",
      "Christopher",
      "Daniel",
      "Matthew",
      "Anthony",
      "Mark",
      "Donald",
      "Steven",
      "Paul",
      "Andrew",
      "Joshua",
    ]

    const firstNamesFemale = [
      "Mary",
      "Patricia",
      "Jennifer",
      "Linda",
      "Elizabeth",
      "Barbara",
      "Susan",
      "Jessica",
      "Sarah",
      "Karen",
      "Nancy",
      "Lisa",
      "Betty",
      "Margaret",
      "Sandra",
      "Ashley",
      "Kimberly",
      "Emily",
      "Donna",
      "Michelle",
    ]

    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
      "Miller",
      "Wilson",
      "Moore",
      "Taylor",
      "Anderson",
      "Thomas",
      "Jackson",
      "White",
      "Harris",
      "Martin",
      "Thompson",
      "Garcia",
      "Martinez",
      "Robinson",
    ]

    const names = []
    for (let i = 0; i < nameCount; i++) {
      let firstName
      if (nameGender === "male") {
        firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]
      } else if (nameGender === "female") {
        firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)]
      } else {
        // Any gender
        const allFirstNames = [...firstNamesMale, ...firstNamesFemale]
        firstName = allFirstNames[Math.floor(Math.random() * allFirstNames.length)]
      }

      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      names.push(`${firstName} ${lastName}`)
    }

    setGeneratedNames(names)
  }

  const copyNames = () => {
    if (generatedNames.length === 0) return

    navigator.clipboard
      .writeText(generatedNames.join("\n"))
      .then(() => {
        toast({
          title: "Copied!",
          description: "Names copied to clipboard",
        })
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy names",
          variant: "destructive",
        })
      })
  }

  return (
    <ToolLayout title="Random Generators" description="Generate random passwords, names, and more" emoji="🎲">
      <Tabs defaultValue="password">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Password Generator</TabsTrigger>
          <TabsTrigger value="name">Name Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Length: {passwordLength}</label>
              <input
                type="range"
                min="4"
                max="32"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                <label
                  htmlFor="uppercase"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Uppercase Letters (A-Z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                <label
                  htmlFor="lowercase"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Lowercase Letters (a-z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                <label
                  htmlFor="numbers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Numbers (0-9)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                <label
                  htmlFor="symbols"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Symbols (!@#$%^&*)
                </label>
              </div>
            </div>

            <Button onClick={generatePassword}>Generate Password</Button>

            {generatedPassword && (
              <div className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    className="block w-full rounded-l-md border-gray-300 bg-gray-50 sm:text-sm p-2.5 border"
                  />
                  <button
                    onClick={copyPassword}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="name" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Names</label>
              <input
                type="number"
                min="1"
                max="20"
                value={nameCount}
                onChange={(e) => setNameCount(Number.parseInt(e.target.value) || 1)}
                className="block w-24 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={nameGender}
                onChange={(e) => setNameGender(e.target.value)}
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <Button onClick={generateNames}>Generate Names</Button>

            {generatedNames.length > 0 && (
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md mb-2">
                  <ul className="space-y-1">
                    {generatedNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
                <Button onClick={copyNames} variant="outline">
                  Copy All Names
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}

