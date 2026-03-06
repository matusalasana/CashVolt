import React, { useState } from 'react';
import { Plus, MinusCircle, TrendingUp } from 'lucide-react';

const CallForExpenseBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex fixed bottom-8 right-8 items-center justify-center min-h-[200px] p-8">
      {/* Container flows from right to left */}
      <div className="flex animate-bounce flex-row-reverse items-center gap-4">
        
        {/* Main Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`z-20 p-4 rounded-full shadow-lg transition-all duration-300 active:scale-95 ${
            isOpen ? 'bg-gray-800 rotate-45' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        {/* Action Items (Appear on the left) */}
        {isOpen && (
          <div className="flex flex-row-reverse gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
            
            {/* Add Income Button */}
            <button className="group flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg shadow-sm hover:bg-green-50 transition-colors">
              <span className="text-sm font-medium text-green-700">Add Income</span>
              <div className="p-1 bg-green-100 rounded text-green-600">
                <Plus className="w-4 h-4" />
              </div>
            </button>

            {/* Add Expense Button */}
            <button className="group flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-50 transition-colors">
              <span className="text-sm font-medium text-red-700">Add Expense</span>
              <div className="p-1 bg-red-100 rounded text-red-600">
                <Plus className="w-4 h-4" />
              </div>
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default CallForExpenseBtn;
