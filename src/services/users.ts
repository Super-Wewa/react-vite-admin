import { User, UserType } from "../lib/types";
import axiosInstance from "./axios";

export const getUsers = async (type?: UserType): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get('/users', {
      params: {
        ...(type && { type })
      }
    })
    return data
  } catch {
    return []
  }
}

export const updateUser = async (id: string, dto: Partial<User>): Promise<User | undefined> => {
  try {
    const { data } = await axiosInstance.put(`/users/${id}`, dto)
    return data
  } catch {
    return undefined
  }
}
