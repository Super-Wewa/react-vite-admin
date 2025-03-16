import { Currency } from "../lib/types"
import axiosInstance from "./axios"

export const loadCurrencies = async (): Promise<Currency[]> => {
  try {
    const { data } = await axiosInstance.get('/currencies')
    return data
  } catch {
    return []
  }
}
