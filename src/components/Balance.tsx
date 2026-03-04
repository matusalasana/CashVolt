import React from 'react'

const Balance= () => {
  
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
      <p className="text-xl font-bold text-center">BALANCE</p>
      <p className="text-2xl font-bold text-center">6,800.00 ETB</p>
      <div className="flex justify-between">
        <p>Remaining</p>
        <p>68%</p>
      </div>
    </div>
  )
}

export default Balance