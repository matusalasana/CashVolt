import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, Upload, Plus, Trash2 } from 'lucide-react';

interface Entry {
  Source: string;
  Description: string;
  Amount: number;
}

const ExcelActions = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState({ source: '', desc: '', amount: '' });

  // Add new entry to the local list
  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source || !form.amount) return;
    
    const newEntry: Entry = { 
      Source: form.source, 
      Description: form.desc, 
      Amount: parseFloat(form.amount) 
    };
    setEntries([...entries, newEntry]);
    setForm({ source: '', desc: '', amount: '' }); // Reset form
  };

  // Export List to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "My_Income_Data.xlsx");
  };

  // Import Excel to List
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<Entry>(sheet);
      setEntries(json); // This replaces current list with Excel data
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 1. Input Form */}
      <form onSubmit={addEntry} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <input 
          placeholder="Source (e.g. Mom)" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.source} onChange={e => setForm({...form, source: e.target.value})}
        />
        <input 
          placeholder="Description" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}
        />
        <input 
          type="number" placeholder="Amount (ETB)" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
        />
        <button type="submit" className="bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all py-3">
          <Plus size={20} /> Add
        </button>
      </form>

      {/* 2. Action Buttons */}
      <div className="flex gap-4">
        <button onClick={handleExport} disabled={entries.length === 0} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-bold disabled:opacity-50">
          <Download size={18} /> Export to Excel
        </button>
        <label className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition-all">
          <Upload size={18} /> Import Excel
          <input type="file" accept=".xlsx, .xls" onChange={handleImport} className="hidden" />
        </label>
      </div>

      {/* 3. Data Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Source</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Description</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.length > 0 ? entries.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-700">{item.Source}</td>
                <td className="p-4 text-slate-500 italic">{item.Description}</td>
                <td className="p-4 text-right font-bold text-indigo-600">{item.Amount.toLocaleString()} <span className="text-[10px]">ETB</span></td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="p-10 text-center text-slate-400">No data. Add entries or import a file.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelActions;
