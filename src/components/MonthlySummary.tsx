import React from 'react'

const MonthlySummary = () => {
  
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
    
      <p className="text-xl font-bold text-center">THIS MONTH SUMMARY</p>
      
      <div className="flex flex-col gap-6">
      
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <p className="font-bold">Expenses</p>
            <p>Food</p>
            <p>Drink</p>
            <p>Entertainment</p>
            <p>Other</p>
          </div>
          <div className="flex items-center flex-col justify-between">
            <p className="font-bold">Amount</p>
            <p className="text-red-600">2,200.00</p>
            <p className="text-yellow-600">1000.00</p>
            <p>400.00</p>
            <p>100.00</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Percentage</p>
            <p>80%</p>
            <p>13%</p>
            <p>5%</p>
            <p>2%</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <p className="font-bold">Transfers</p>
            <p>to cash</p>
            <p>to a person</p>
          </div>
          <div className="flex flex-col justify-between items-center">
            <p className="font-bold">Amount</p>
            <p className="text-red-600">2,200.00</p>
            <p className="text-yellow-600">1000.00</p>
          </div>
          <div className="flex items-center flex-col justify-center items-center">
            <p className="font-bold">Percentage</p>
            <p>77%</p>
            <p>23%</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center flex-col justify-between">
            <p className="font-bold">Income</p>
            <p>10,000.00</p>
          </div>
          <div className="flex flex-col items-center justify-between">
            <p className="font-bold">Balance</p>
            <p>3,200.00</p>
          </div>
          <div className="flex flex-col justify-between items-center">
            <p className="font-bold">Savings</p>
            <p>1,000.00</p>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default MonthlySummary