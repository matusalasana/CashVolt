import React from 'react'
import Title from "./Title"

const IncomeTable = () => {
  return (
    <div>
      <div> <Title txt1="MY" txt2="INCOME"/> </div>
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-green-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Mom</td>
            <td className="border border-gray-300 px-4 py-2">Monthly fixed money from my mom</td>
            <td className="border border-gray-300 px-4 py-2">1,500.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Romeo</td>
            <td className="border border-gray-300 px-4 py-2">Monthly fixed money from my best friend Tinsae AKA Romeo</td>
            <td className="border border-gray-300 px-4 py-2 text-left">3,000.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Mom</td>
            <td className="border border-gray-300 px-4 py-2">From my mom</td>
            <td className="border border-gray-300 px-4 py-2 text-left">500.00</td>
          </tr>
          <tr className="font-bold bg-gray-300">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2"></td>
            <td className="border border-gray-300 px-4 py-2 text-left">7,000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IncomeTable