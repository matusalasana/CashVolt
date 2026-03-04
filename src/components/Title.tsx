import React from 'react';

interface Props {
  txt1: string;
  txt2: string;
}

const Title: React.FC<Props> = ({ txt1, txt2 }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8 gap-1">
      <div className="flex gap-2 items-center">
        {/* First word: Lighter weight, uppercase for a "category" feel */}
        <span className="text-3xl font-extralight text-slate-500 tracking-tight uppercase">
          {txt1}
        </span>
        
        {/* Second word: Bold, branded color with a slight shadow effect */}
        <span className="text-3xl font-black text-indigo-600 tracking-tighter drop-shadow-sm">
          {txt2}
        </span>
      </div>
      
      {/* Modern Accent: A small centered bar to ground the title */}
      <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mt-1 opacity-80" />
    </div>
  );
};

export default Title;
