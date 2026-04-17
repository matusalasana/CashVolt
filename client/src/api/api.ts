import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3000/api";
  }
  return "/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

export default API;