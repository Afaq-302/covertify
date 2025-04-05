import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import Image from "next/image"
export default function Home() {
  const toolCategories = [
    {
      title: "Measurement Conversions",
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
      title: "Calculators & Utilities",
      tools: [
        { name: "Currency Converter", path: "/currency", emoji: "💰" },
        { name: "Timestamp Tool", path: "/timestamp", emoji: "📅" },
        { name: "Text Tools", path: "/text", emoji: "📝" },
        { name: "Age Calculator", path: "/age", emoji: "🎂" },
        { name: "Loan / EMI Calculator", path: "/loan", emoji: "🏦" },
        { name: "Random Generators", path: "/random", emoji: "🎲" },
        { name: "Countdown Timer", path: "/timer", emoji: "⏱️" },
      ],
    },
  ]

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
          Universal Unit Converter by
          <a className="ml-1 underline" href="https://afaq-dev-site.vercel.app/" >
            Afaq
          </a>
          💖
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Your all-in-one toolkit for seamless conversions, smart calculations, and daily utilities —
          crafted with love to make your digital life easier, faster, and more delightful. Whether you're crunching numbers,
          managing time, or converting units, I've got you covered with powerful, reliable tools at your fingertips.
        </p>
      </section>

      <section className="space-y-10">
        {toolCategories.map((category, index) => (
          <div key={index} className="space-y-6">
            <h2 className="text-3xl font-bold">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.tools.map((tool, toolIndex) => (
                <Link
                  key={toolIndex}
                  href={tool.path}
                  className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow group"
                >
                  <span className="text-2xl mr-3">{tool.emoji}</span>
                  <span className="text-lg font-semibold">{tool.name}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="py-16 bg-gray-50 rounded-xl shadow-inner mt-12">
        <div className="max-w-3xl mx-auto text-center space-y-6 px-4">
          {/* Profile Image */}
          <div className="flex justify-center">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4D35AQG042qJ105eMA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1683913588432?e=1744452000&v=beta&t=whc0JVPGbNJGRXBnNutU5IqnzBCQMzpei7q4aNzKdk0"
              alt="Afaq's Profile"
              className="w-44 h-44 rounded-full object-cover shadow-md"
              width={100}
              height={100}
            />
          </div>

          <h2 className="text-4xl font-bold">About Me</h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Hey! I'm Afaq — a passionate full-stack developer who loves building clean,
            functional web experiences. I enjoy solving real-world problems and crafting
            tools that make life easier for users and devs alike.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              href="https://github.com/Afaq-302"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:text-black transition"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </Link>

            <Link
              href="https://linkedin.com/in/afaqy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:text-black transition"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </Link>
          </div>

          <div>
            <Link
              href="https://afaq-dev-site.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-600 font-semibold underline hover:text-blue-800 transition"
            >
              Visit My Portfolio →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
