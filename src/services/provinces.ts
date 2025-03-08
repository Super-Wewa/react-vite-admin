import { Province } from "../lib/types";
import axiosInstance from "./axios";

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const { data } = await axiosInstance.get('/provinces')
    return data
  } catch {
    return []
  }
}
