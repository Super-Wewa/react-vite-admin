/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fee } from "../lib/types";
import axiosInstance from "./axios";

export const loadFees = async (): Promise<Fee[]> => {
  try {
    const { data } = await axiosInstance.get('/fees')
    return data
  } catch {
    return []
  }
}

export const createFee = async (dto: any): Promise<Fee | undefined> => {
  try {
    const { data } = await axiosInstance.post('/fees', dto)
    return data
  } catch {
    return
  }
}

export const updateFee = async (id: string, dto: any): Promise<Fee | undefined> => {
  try {
    const { data } = await axiosInstance.patch(`/fees/${id}`, dto)
    return data
  } catch {
    return
  }
}
