import { AppWallet } from "../lib/types";
import axiosInstance from "./axios";

export const getAppWallets = async (): Promise<AppWallet[]> => {
  try {
    const { data } = await axiosInstance.get('/app-wallets')
    return data
  } catch {
    return []
  }
}
