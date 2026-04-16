
import API from "../api/api"
import { type LoginInput, type RegisterInput } from "../types"

export const getUser = async () => {
  const res = await API.get("/auth/me")
  return res.data
}

export const loginUser = async (data: LoginInput) => {
  const res = await API.post(`/auth/login`, data)
  return res.data
}

export const registerUser = async (data: RegisterInput) => {
  const res = await API.post(`/auth/register`, data)
  return res.data
}

export const logoutUser = async () => {
  const res = await API.post(`/auth/logout`)
  return res.data
}