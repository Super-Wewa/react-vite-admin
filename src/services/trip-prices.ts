import { TripPrice } from "../lib/types";
import axiosInstance from "./axios";

export const getPrices = async (): Promise<TripPrice[]> => {
  try {
    const { data } = await axiosInstance.get('/prices')
    return data
  } catch {
    return []
  }
}

export const upsertTripPrice = async (dto: { price: number, currencyId: string }): Promise<TripPrice | undefined> => {
  try {
    const { data } = await axiosInstance.post('/prices', dto)
    return data
  } catch {
    return
  }
}
