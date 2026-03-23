import   { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, Trash, Upload, Plus } from 'lucide-react';
import useIncomeStore from "../stores/incomeStore";

const AddIncome = () => {
  // 1. Pull everything from Zustand
  const incomeItems = useIncomeStore((state) => state.items);
  const totalIncome = useIncomeStore((state) => state.totalIncome);
  const addIncome = useIncomeStore((state) => state.addIncome);
  const removeIncome = useIncomeStore((state) => state.removeIncome)

  const [form, setForm] = useState({ source: '', desc: '', amount: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source || !form.amount) return;

    // Call the Zustand action
    addIncome({
      source: form.source,
      description: form.desc,
      amount: parseFloat(form.amount),
    });

    setForm({ source: '', desc: '', amount: '' });
  };

  const handleExport = () => {
    // Map internal keys to nice Excel headers
    const dataToExport = incomeItems.map(item => ({
      Source: item.source,
      Description: item.description,
      Amount: item.amount,
      Date: item.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
    XLSX.writeFile(workbook, "My_Income_Data.xlsx");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const json = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);

      // Bulk add imported items to Zustand
      json.forEach((row) => {
        addIncome({
          source: row.Source || 'Unknown',
          description: row.Description || '',
          amount: parseFloat(row.Amount) || 0,
        });
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Total Display */}
      <div className="bg-indigo-50 p-4 rounded-2xl flex justify-between items-center border border-indigo-100">
        <span className="text-indigo-900 font-medium">Total Income</span>
        <span className="text-2xl font-bold text-indigo-600">{totalIncome.toLocaleString()} ETB</span>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <input 
          placeholder="Source (e.g. Salary)" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          value={form.source} onChange={e => setForm({...form, source: e.target.value})}
        />
        <input 
          placeholder="Description" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}
        />
        <input 
          type="number" placeholder="Amount" 
          className="p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
        />
        <button type="submit" className="bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all py-3">
          <Plus size={20} /> Add
        </button>
      </form>

      <div className="flex gap-4">
        <button onClick={handleExport} disabled={incomeItems.length === 0} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-emerald-700 transition-all">
          <Download size={18} /> Export
        </button>
        <label className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition-all">
          <Upload size={18} /> Import
          <input type="file" accept=".xlsx, .xls" onChange={handleImport} className="hidden" />
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Source</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Description</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incomeItems.length > 0 ? incomeItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-700">{item.source}</td>
                <td className="p-4 text-slate-500 italic">{item.description}</td>
                <td className="p-4 text-right font-bold text-indigo-600">{item.amount.toLocaleString()} ETB</td>
                <td>
                  <Trash onClick={() => removeIncome(item.id)} />
                </td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="p-10 text-center text-slate-400">No data found in store.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddIncome;
