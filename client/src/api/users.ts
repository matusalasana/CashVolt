import axios from "axios"
import API from "../api/api"
import { type UserInput } from "../types"


type UpdateUserInfoInput = {
  id: number;
  data: UserInput;
}
export const getUserInfo = async () => {
  const res = await API.get("/auth/me")
  return res.data
}

export const updateUserInfo = async ({id, data}) => {
  const res = await API.put(`/auth/me/${id}`, data)
  return res.data
}