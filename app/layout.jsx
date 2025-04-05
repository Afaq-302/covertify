import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Convertify by Afaq 💖",
  description: "A collection of helpful conversion and utility tools",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <footer className="py-6 border-t">
            <div className="container mx-auto px-4 text-center text-sm">
              <p className="bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text font-semibold">
                © {new Date().getFullYear()} Convertify. Created by Afaq 💖
              </p>
            </div>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
