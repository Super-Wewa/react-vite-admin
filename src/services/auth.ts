import { Admin, LoginDto } from "../lib/types";
import axiosInstance from "./axios";

export const login = async (dto: LoginDto): Promise<{ token: string, user: Admin } | undefined> => {
  try {
    const { data } = await axiosInstance.post('/auth/admin-login', dto)
    return data
  } catch {
    return undefined
  }
}
