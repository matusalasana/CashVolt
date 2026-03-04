const ExpenseTable = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-green-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Food</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Dabo kolo</td>
            <td className="border border-gray-300 px-4 py-2">400.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Mother bet</td>
            <td className="border border-gray-300 px-4 py-2">200.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">700.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-yellow-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Fixed Expenses</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Water</td>
            <td className="border border-gray-300 px-4 py-2">800.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Electric</td>
            <td className="border border-gray-300 px-4 py-2">1000.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">1,300.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-red-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Shopping</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Jacket</td>
            <td className="border border-gray-300 px-4 py-2">2,400.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">T-shirt</td>
            <td className="border border-gray-300 px-4 py-2">900.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">3,200.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-blue-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Medical</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Teeth</td>
            <td className="border border-gray-300 px-4 py-2">4,000.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Insurance</td>
            <td className="border border-gray-300 px-4 py-2">2,000.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">7,000.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-pink-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Transportation</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Piasa</td>
            <td className="border border-gray-300 px-4 py-2">40.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Addisu Gebeya</td>
            <td className="border border-gray-300 px-4 py-2">20.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">100.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-cyan-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Fitness</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Gym membership</td>
            <td className="border border-gray-300 px-4 py-2">600.00</td>
          </tr>

          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">700.00</td>
          </tr>
        </tbody>
      </table>
      
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-indigo-400">
            <th className="border border-gray-300 px-4 py-2 text-left">Entertainment</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (ETB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Chips</td>
            <td className="border border-gray-300 px-4 py-2">40.00</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Dabo kolo</td>
            <td className="border border-gray-300 px-4 py-2">150.00</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-4 py-2">700.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable