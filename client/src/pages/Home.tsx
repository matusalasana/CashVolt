import { useTransactions } from "../hooks/useTransactions";
import { HiArrowTrendingDown, HiArrowTrendingUp, HiTrash } from "react-icons/hi2";

const Home = () => {
  // 1. Ask the "Brain" for the data
  const { transactions, isLoading, isError, deleteTransaction } = useTransactions();

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 3. Handle Error State
  if (isError) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10">
        <span>Error connecting to the server. Check your backend!</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recent Transactions</h1>
        <button className="btn btn-primary btn-sm">+ Add New</button>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {transactions?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 opacity-50">
                  No transactions found. Add your first one!
                </td>
              </tr>
            ) : (
              transactions?.map((tx) => (
                <tr key={tx.id} className="hover">
                  <td>{new Date(tx.transaction_date).toLocaleDateString()}</td>
                  <td className="font-medium">{tx.source}</td>
                  <td>
                    <div className="badge badge-ghost">{tx.category_name || "General"}</div>
                  </td>
                  <td className={tx.type === 'expense' ? 'text-error font-bold' : 'text-success font-bold'}>
                    <div className="flex items-center gap-1">
                      {tx.type === 'expense' ? <HiArrowTrendingDown /> : <HiArrowTrendingUp />}
                      {tx.type === 'expense' ? '-' : '+'}${Number(tx.amount).toFixed(2)}
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => { if(confirm('Delete?')) deleteTransaction(tx.id!) }}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      <HiTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
