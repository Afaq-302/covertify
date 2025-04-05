"use client"

import { useState, useEffect } from "react"
import ToolLayout from "@/components/ToolLayout"
import { useToast } from "@/components/ui/use-toast"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [exchangeRate, setExchangeRate] = useState(null)
  const [convertedAmount, setConvertedAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currencies, setCurrencies] = useState(["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL"])
  const { toast } = useToast()

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) return

    setIsLoading(true)

    try {
      // In a real app, you would use a real API like:
      // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      // const data = await response.json()
      // const rate = data.rates[toCurrency]

      // For demo purposes, using fixed rates
      const mockRates = {
        USD: { EUR: 0.85, GBP: 0.75, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, BRL: 5.2 },
        EUR: { USD: 1.18, GBP: 0.88, JPY: 130, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.6, INR: 87.8, BRL: 6.12 },
        GBP: { USD: 1.33, EUR: 1.14, JPY: 147, CAD: 1.67, AUD: 1.8, CHF: 1.23, CNY: 8.6, INR: 99.3, BRL: 6.93 },
        JPY: {
          USD: 0.009,
          EUR: 0.0077,
          GBP: 0.0068,
          CAD: 0.011,
          AUD: 0.012,
          CHF: 0.0084,
          CNY: 0.058,
          INR: 0.67,
          BRL: 0.047,
        },
        CAD: { USD: 0.8, EUR: 0.68, GBP: 0.6, JPY: 88, AUD: 1.08, CHF: 0.74, CNY: 5.16, INR: 59.6, BRL: 4.16 },
        AUD: { USD: 0.74, EUR: 0.63, GBP: 0.56, JPY: 81.5, CAD: 0.93, CHF: 0.68, CNY: 4.78, INR: 55.2, BRL: 3.85 },
        CHF: { USD: 1.09, EUR: 0.93, GBP: 0.81, JPY: 119, CAD: 1.36, AUD: 1.47, CNY: 7, INR: 81, BRL: 5.65 },
        CNY: {
          USD: 0.155,
          EUR: 0.132,
          GBP: 0.116,
          JPY: 17,
          CAD: 0.194,
          AUD: 0.209,
          CHF: 0.143,
          INR: 11.55,
          BRL: 0.806,
        },
        INR: {
          USD: 0.0134,
          EUR: 0.0114,
          GBP: 0.01,
          JPY: 1.48,
          CAD: 0.0168,
          AUD: 0.0181,
          CHF: 0.0123,
          CNY: 0.0866,
          BRL: 0.0698,
        },
        BRL: { USD: 0.192, EUR: 0.163, GBP: 0.144, JPY: 21.2, CAD: 0.24, AUD: 0.26, CHF: 0.177, CNY: 1.24, INR: 14.33 },
      }

      let rate
      if (fromCurrency === toCurrency) {
        rate = 1
      } else {
        rate = mockRates[fromCurrency][toCurrency]
      }

      setExchangeRate(rate)
      setConvertedAmount((Number.parseFloat(amount) * rate).toFixed(2))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Please try again later.",
        variant: "destructive",
      })
      console.error("Error fetching exchange rates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <ToolLayout title="Currency Converter" description="Convert between different currencies" emoji="💰">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Currency</label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSwapCurrencies} className="p-2 rounded-full hover:bg-gray-100">
            ↑↓
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Currency</label>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Converted Amount</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={convertedAmount}
                readOnly
                className="block w-full rounded-md border-gray-300 bg-gray-50 sm:text-sm p-2.5 border"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{toCurrency}</span>
              </div>
            </div>
          </div>
        </div>

        {exchangeRate && (
          <div className="text-center text-sm text-gray-500">
            Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
          </div>
        )}

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

