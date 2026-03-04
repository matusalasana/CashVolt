import React from 'react'

const Income = () => {
  
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
      <p className="text-xl font-bold text-center">INCOME</p>
      <p className="text-2xl text-green-600 font-bold text-center">10,000.00 ETB</p>
      <div className="flex justify-between">
        <p>Gift</p>
        <p>1,000.00</p>
      </div>
      <div className="flex justify-between">
        <p>Salary</p>
        <p>9,000.00</p>
      </div>
      
    </div>
  )
}

export default Income