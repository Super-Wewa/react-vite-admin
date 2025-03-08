import { Trip } from "../lib/types"
import axiosInstance from "./axios"

export const getTrips = async ({ start, end }: { start: string, end: string }): Promise<Trip[]> => {
  try {
    const { data } = await axiosInstance.get('/trips', {
      params: {
        start,
        end
      }
    })
    return data
  } catch {
    return []
  }
}
