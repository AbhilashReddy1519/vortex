import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
})

export async function getHealth() {
  return await api.get('/health');
}
