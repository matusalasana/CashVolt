import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TransactionInput, transactionSchema } from "../types"
import { z } from 'zod';
import API from "../api/api"
import { useAccounts } from "../hooks/useAccounts"
import { useCategories } from "../hooks/useCategories"
import { useCreateTransaction} from "../hooks/useTransactions"
import { 
  DollarSign, 
  Calendar, 
  Tag, 
  Wallet, 
  FileText, 
  PlusCircle, 
  X 
} from 'lucide-react';

const AddTransactionForm = () => {
  
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()
  const { mutateAsync: createTransaction } = useCreateTransaction()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_date: new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = async (data: TransactionInput) => {
      await createTransaction(data)
      reset()
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="card bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-2xl font-bold flex gap-2">
              <PlusCircle className="text-primary" />
              New Transaction
            </h2>
            <button className="btn btn-ghost btn-sm btn-circle">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Amount Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Amount</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50">
                  <DollarSign size={18} />
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`input input-bordered w-full pl-12 text-lg font-medium focus:input-primary ${errors.amount ? 'input-error' : ''}`}
                  {...register('amount')}
                />
              </div>
              {errors.amount && <span className="text-error text-xs mt-1">{errors.amount.message}</span>}
            </div>

            {/* Description Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base-content/50">
                  <FileText size={18} />
                </span>
                <textarea
                  className={`textarea textarea-bordered w-full pl-12 h-20 focus:textarea-primary ${errors.description ? 'textarea-error' : ''}`}
                  placeholder="What was this for?"
                  {...register('description')}
                />
              </div>
              {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Account</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10">
                    <Wallet size={18} />
                  </span>
                  <select 
                    className={`select select-bordered w-full pl-12 focus:select-primary ${errors.account_id ? 'select-error' : ''}`}
                    {...register('account_id')}
                  >
                    <option value="">Select Account</option>
                    {accounts?.map((account) => (
                      <option value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
                {errors.account_id && <span className="text-error text-xs mt-1">{errors.account_id.message}</span>}
              </div>

              {/* Category Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10">
                    <Tag size={18} />
                  </span>
                  <select 
                    className="select select-bordered w-full pl-12 focus:select-primary"
                    {...register('category_id')}
                  >
                    <option value="">Select category</option>
                    { categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                {errors.category_id && <span className="text-error text-xs mt-1">{errors.category_id.message}</span>}
              </div>
            </div>

            {/* Date Picker */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Transaction Date</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10">
                  <Calendar size={18} />
                </span>
                <input
                  type="date"
                  className={`input input-bordered w-full pl-12 focus:input-primary ${errors.transaction_date ? 'input-error' : ''}`}
                  {...register('transaction_date')}
                />
              </div>
              {errors.transaction_date && <span className="text-error text-xs mt-1">{errors.transaction_date.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/20"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add Transaction"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;