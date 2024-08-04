import type { AxiosInstance } from "axios";
import axios from "axios";

export const brasilApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BRASIL_API_URL,
});
