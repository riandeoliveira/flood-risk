import type { AxiosInstance } from "axios";
import axios from "axios";

export const floodRiskApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLOOD_RISK_API_URL,
});
