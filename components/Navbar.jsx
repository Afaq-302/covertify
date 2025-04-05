"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(null)

  const categories = [
    {
      name: "Measurement",
      tools: [
        { name: "Weight / Mass", path: "/weight", emoji: "⚖️" },
        { name: "Temperature", path: "/temperature", emoji: "🌡️" },
        { name: "Length / Distance", path: "/length", emoji: "📏" },
        { name: "Volume", path: "/volume", emoji: "🧪" },
        { name: "Time", path: "/time", emoji: "🕒" },
        { name: "Digital Storage", path: "/storage", emoji: "💾" },
        { name: "Energy / Power", path: "/energy", emoji: "⚡" },
        { name: "Speed", path: "/speed", emoji: "🚗" },
      ],
    },
    {
      name: "Utilities",
      tools: [
        { name: "Currency Converter", path: "/currency", emoji: "💰" },
        { name: "Timestamp Tool", path: "/timestamp", emoji: "📅" },
        { name: "Text Tools", path: "/text", emoji: "📝" },
        { name: "Age Calculator", path: "/age", emoji: "🎂" },
        { name: "Loan Calculator", path: "/loan", emoji: "🏦" },
        { name: "Random Generators", path: "/random", emoji: "🎲" },
        { name: "Countdown Timer", path: "/timer", emoji: "⏱️" },
      ],
    },
  ]

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index)
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
                Convertify
              </span>
            </Link>
          </div>


          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {categories.map((category, index) => (
              <div key={index} className="relative group">
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center"
                  onClick={() => toggleCategory(index)}
                >
                  {category.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-[-30px] mt-2 w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {category.tools.map((tool, toolIndex) => (
                      <Link
                        key={toolIndex}
                        href={tool.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-2">{tool.emoji}</span>
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category, index) => (
              <div key={index}>
                <button
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => toggleCategory(index)}
                >
                  {category.name}
                  <ChevronDown className={`ml-1 h-4 w-4 transform ${openCategory === index ? "rotate-180" : ""}`} />
                </button>
                {openCategory === index && (
                  <div className="pl-4 space-y-1">
                    {category.tools.map((tool, toolIndex) => (
                      <Link
                        key={toolIndex}
                        href={tool.path}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-2">{tool.emoji}</span>
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

