"use client"

import { useState } from "react"
import ToolLayout from "@/components/ToolLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function TextTools() {
  const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [charNoSpacesCount, setCharNoSpacesCount] = useState(0)
  const [sentenceCount, setSentenceCount] = useState(0)
  const [paragraphCount, setParagraphCount] = useState(0)
  const [loremLength, setLoremLength] = useState(5)
  const [loremUnit, setLoremUnit] = useState("paragraphs")
  const [loremText, setLoremText] = useState("")
  const { toast } = useToast()

  const handleTextChange = (e) => {
    const value = e.target.value
    setText(value)

    // Count words
    const words = value.trim() ? value.trim().split(/\s+/) : []
    setWordCount(words.length)

    // Count characters
    setCharCount(value.length)

    // Count characters without spaces
    setCharNoSpacesCount(value.replace(/\s/g, "").length)

    // Count sentences (roughly)
    const sentences = value.split(/[.!?]+/).filter(Boolean)
    setSentenceCount(sentences.length)

    // Count paragraphs
    const paragraphs = value.split(/\n+/).filter(Boolean)
    setParagraphCount(paragraphs.length)
  }

  const handleClearText = () => {
    setText("")
    setWordCount(0)
    setCharCount(0)
    setCharNoSpacesCount(0)
    setSentenceCount(0)
    setParagraphCount(0)
  }

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard",
        })
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy text",
          variant: "destructive",
        })
      })
  }

  const generateLoremIpsum = () => {
    const loremWords = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "do",
      "eiusmod",
      "tempor",
      "incididunt",
      "ut",
      "labore",
      "et",
      "dolore",
      "magna",
      "aliqua",
      "enim",
      "ad",
      "minim",
      "veniam",
      "quis",
      "nostrud",
      "exercitation",
      "ullamco",
      "laboris",
      "nisi",
      "ut",
      "aliquip",
      "ex",
      "ea",
      "commodo",
      "consequat",
      "duis",
      "aute",
      "irure",
      "dolor",
      "in",
      "reprehenderit",
      "in",
      "voluptate",
      "velit",
      "esse",
      "cillum",
      "dolore",
      "eu",
      "fugiat",
      "nulla",
      "pariatur",
      "excepteur",
      "sint",
      "occaecat",
      "cupidatat",
      "non",
      "proident",
      "sunt",
      "in",
      "culpa",
      "qui",
      "officia",
      "deserunt",
      "mollit",
      "anim",
      "id",
      "est",
      "laborum",
    ]

    let result = ""

    if (loremUnit === "paragraphs") {
      for (let i = 0; i < loremLength; i++) {
        let paragraph = ""
        // 5-10 sentences per paragraph
        const sentenceCount = Math.floor(Math.random() * 6) + 5

        for (let j = 0; j < sentenceCount; j++) {
          // 5-15 words per sentence
          const wordCount = Math.floor(Math.random() * 11) + 5
          let sentence = ""

          for (let k = 0; k < wordCount; k++) {
            const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
            sentence += (k === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord) + " "
          }

          paragraph += sentence.trim() + ". "
        }

        result += paragraph + "\n\n"
      }
    } else if (loremUnit === "sentences") {
      for (let i = 0; i < loremLength; i++) {
        // 5-15 words per sentence
        const wordCount = Math.floor(Math.random() * 11) + 5
        let sentence = ""

        for (let j = 0; j < wordCount; j++) {
          const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
          sentence += (j === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord) + " "
        }

        result += sentence.trim() + ". "
      }
    } else if (loremUnit === "words") {
      for (let i = 0; i < loremLength; i++) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
        result += (i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord) + " "
      }
      result = result.trim() + "."
    }

    setLoremText(result.trim())
  }

  const handleCopyLorem = () => {
    navigator.clipboard
      .writeText(loremText)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Lorem Ipsum text copied to clipboard",
        })
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy text",
          variant: "destructive",
        })
      })
  }

  return (
    <ToolLayout title="Text Tools" description="Word counter and Lorem Ipsum generator" emoji="📝">
      <Tabs defaultValue="counter">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="counter">Word Counter</TabsTrigger>
          <TabsTrigger value="lorem">Lorem Ipsum Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="counter" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter or paste your text</label>
            <textarea
              value={text}
              onChange={handleTextChange}
              rows={10}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              placeholder="Type or paste your text here..."
            ></textarea>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleClearText} variant="outline">
              Clear
            </Button>
            <Button onClick={handleCopyText}>Copy</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Words</div>
              <div className="text-2xl font-bold">{wordCount}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Characters</div>
              <div className="text-2xl font-bold">{charCount}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Characters (no spaces)</div>
              <div className="text-2xl font-bold">{charNoSpacesCount}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Sentences</div>
              <div className="text-2xl font-bold">{sentenceCount}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium text-gray-500">Paragraphs</div>
              <div className="text-2xl font-bold">{paragraphCount}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lorem" className="space-y-4">
          <div className="flex items-end space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
              <input
                type="number"
                min="1"
                max="100"
                value={loremLength}
                onChange={(e) => setLoremLength(Number.parseInt(e.target.value) || 1)}
                className="block w-24 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select
                value={loremUnit}
                onChange={(e) => setLoremUnit(e.target.value)}
                className="block rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <Button onClick={generateLoremIpsum}>Generate</Button>
          </div>

          {loremText && (
            <>
              <div>
                <textarea
                  value={loremText}
                  readOnly
                  rows={10}
                  className="block w-full rounded-md border-gray-300 bg-gray-50 sm:text-sm p-2.5 border"
                ></textarea>
              </div>

              <Button onClick={handleCopyLorem}>Copy Lorem Ipsum</Button>
            </>
          )}
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}

