import axios from "axios"
import API from "../api/api"

export const getUserInfo = async () => {
  const res = await API.get("/auth/me")
  return res.data
}