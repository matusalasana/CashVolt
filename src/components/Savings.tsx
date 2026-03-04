import React from 'react'

const Savings= () => {
  
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
      <p className="text-xl font-bold text-center">SAVINGS</p>
      <p className="text-2xl text-blue-600 font-bold text-center">2,000.00 ETB</p>
      <div className="flex justify-between">
        <p>Remaining</p>
        <p>68%</p>
      </div>
    </div>
  )
}

export default Savings