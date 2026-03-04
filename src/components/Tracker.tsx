import React from 'react'

const Tracker = () => {
  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 gap-5">
      {numbers.map(k => 
        <div className="relative w-20 h-20">
          <p className="absolute text-sm -top-1 -left-1">{k}</p>
          <button className="w-20 rounded-xl flex justify-center items-center h-20 bg-white text-6xl">❌
          </button>
        </div>
          )}
      </div>
      
      <div className="w-full bg-white rounded-xl p-3 flex flex-col gap-2">
        <table>
          <tbody>
            <tr>
              <td className="font-bold">Total Days</td>
              <td>30</td>
            </tr>
            <tr>
              <td className="font-bold">Remaining Days</td>
              <td>5</td>
            </tr>
            <tr>
              <td className="font-bold">Completed Days</td>
              <td>25</td>
            </tr>
            <tr>
              <td className="font-bold">Uncompleted Days</td>
              <td>2</td>
            </tr>
            <tr>
              <td className="font-bold">Overall Progress</td>
              <td>Very Good 👍</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tracker