import { create } from 'zustand'
import { Admin } from '../lib/types'
import { persist } from "zustand/middleware"
import { constants } from '../lib/constants'

type State = {
  user?: Admin
  token?: string
  setUser: (u?: Admin) => void
  setToken: (t?: string) => void
  clear: () => void
}

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      setToken: (t) => {
        set({ token: t })
      },
      setUser: (u) => {
        set({ user: u })
      },
      clear: () => {
        set({ token: undefined, user: undefined })
      },
    }),
    {
      name: constants.authPersistKey,
    }
  )
)
