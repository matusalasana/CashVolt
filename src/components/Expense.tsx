import React from 'react'

const Expense = () => {
  
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
      <p className="text-xl font-bold text-center">EXPENSE</p>
      <p className="text-2xl text-red-600 font-bold text-center">3,200.00 ETB</p>
      <div className="flex justify-between">
        <p>Kolo</p>
        <p>2,500.00</p>
      </div>
      <div className="flex justify-between">
        <p>Coke</p>
        <p>600.00</p>
      </div>
      <div className="flex justify-between">
        <p>Others</p>
        <p>100.00</p>
      </div>
      
    </div>
  )
}

export default Expense