"use client"

import { useState, useEffect } from "react"
import ToolLayout from "@/components/ToolLayout"

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(20)
  const [emi, setEmi] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState([])
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm])

  const calculateLoan = () => {
    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / 100 / 12

    // Convert loan term from years to months
    const loanTermMonths = loanTerm * 12

    // Calculate EMI
    const x = Math.pow(1 + monthlyInterestRate, loanTermMonths)
    const monthlyPayment = (loanAmount * x * monthlyInterestRate) / (x - 1)

    // Calculate total payment and interest
    const totalPaymentAmount = monthlyPayment * loanTermMonths
    const totalInterestAmount = totalPaymentAmount - loanAmount

    setEmi(monthlyPayment)
    setTotalPayment(totalPaymentAmount)
    setTotalInterest(totalInterestAmount)

    // Generate amortization schedule
    generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyPayment, loanTermMonths)
  }

  const generateAmortizationSchedule = (principal, monthlyRate, monthlyPayment, termMonths) => {
    let balance = principal
    const schedule = []

    for (let i = 1; i <= termMonths; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      schedule.push({
        month: i,
        payment: monthlyPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        balance: balance > 0 ? balance : 0,
      })
    }

    setAmortizationSchedule(schedule)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleLoanAmountChange = (e) => {
    setLoanAmount(Number.parseFloat(e.target.value) || 0)
  }

  const handleInterestRateChange = (e) => {
    setInterestRate(Number.parseFloat(e.target.value) || 0)
  }

  const handleLoanTermChange = (e) => {
    setLoanTerm(Number.parseFloat(e.target.value) || 0)
  }

  const toggleSchedule = () => {
    setShowFullSchedule(!showFullSchedule)
  }

  return (
    <ToolLayout
      title="Loan / EMI Calculator"
      description="Calculate monthly payments, total interest, and amortization schedule"
      emoji="🏦"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% per year)</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                step="0.1"
                className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={handleLoanTermChange}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Monthly Payment (EMI)</div>
            <div className="text-2xl font-bold">{formatCurrency(emi)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Total Payment</div>
            <div className="text-2xl font-bold">{formatCurrency(totalPayment)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Total Interest</div>
            <div className="text-2xl font-bold">{formatCurrency(totalInterest)}</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Amortization Schedule</h3>
            <button onClick={toggleSchedule} className="text-blue-500 hover:text-blue-700 text-sm">
              {showFullSchedule ? "Show Less" : "Show Full Schedule"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Month
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Principal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Interest
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {amortizationSchedule.slice(0, showFullSchedule ? amortizationSchedule.length : 12).map((row) => (
                  <tr key={row.month}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.payment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(row.principalPayment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(row.interestPayment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

