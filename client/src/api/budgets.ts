import API from "./api"
import { type BudgetInput } from "../types"

type BudgetUpdateInput = {
  id: number;
  data: BudgetInput;
}

export const getBudgets = async (month?:number, year?: number) => {
  const result = await API.get("/budgets", {
    params: { month, year }
  })
  return result.data
}

export const createBudget = async (data: BudgetInput) => {
  const result = await API.post(`/budgets`, data)
  return result.data
}

export const updateBudget = async ({id, data}: BudgetUpdateInput) => {
  const result = await API.put(`/budgets/${id}`, data)
  return result.data
}

export const deleteBudget = async (id: number) => {
  const result = await API.delete(`/budgets/${id}`)
  return result.data
}