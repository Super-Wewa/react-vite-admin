import { Breakpoint } from "../lib/types";
import axiosInstance from "./axios";

export const loadBreakpoints = async (): Promise<Breakpoint[]> => {
  try {
    const { data } = await axiosInstance.get('/trips-bonuses-breakpoints/all')
    return data
  } catch {
    return []
  }
}

export const createBreakpoint = async (dto: { amount: number, currencyId: string, tripsCount: number }): Promise<Breakpoint | undefined> => {
  try {
    const { data } = await axiosInstance.post('/trips-bonuses-breakpoints', dto)
    return data
  } catch {
    return
  }
}

export const updateBreakpoint = async (id: string, dto: { tripsCount: number, active: boolean }) => {
  try {
    await axiosInstance.put(`/trips-bonuses-breakpoints/${id}`, dto)
    return true
  } catch {
    return false
  }
}

export const updateBreakpointBonus = async (id: string, dto: { amount: number, currencyId: string }) => {
  try {
    await axiosInstance.put(`/trips-bonuses-breakpoints-rewards/${id}`, dto)
    return true
  } catch {
    return false
  }
}
