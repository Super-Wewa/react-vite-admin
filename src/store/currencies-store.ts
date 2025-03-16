import { create } from "zustand"
import { Currency } from "../lib/types"
import { loadCurrencies } from "../services/currencies"

type State = {
  currencies: Currency[]
  loading: boolean
  loadCurrencies: () => void
}

export const useCurrenciesStore = create<State>((set) => ({
  currencies: [],
  loading: false,
  loadCurrencies: async () => {
    set({ loading: true })
    set({ currencies: await loadCurrencies(), loading: false })
  },
}))
