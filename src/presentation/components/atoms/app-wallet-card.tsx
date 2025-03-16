import { useEffect, useState } from "react";
import { AppWallet } from "../../../lib/types";
import { Loader } from "rizzui/loader";
import { getAppWallets } from "../../../services/app-wallet";

export default function AppWalletCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [wallets, setWallets] = useState<AppWallet[]>([])

  const loadData = async () => {
    setLoading(true)
    setWallets(await getAppWallets())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="w-full flex flex-col p-4 gap-4 rounded-md shadow-xl">
      <h2 className="font-semibold underline text-lg text-c-primary">
        Revenus de l'application
      </h2>
      {
        loading ? (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        ) : (
          wallets.map((wallet) => (
            <div className="w-full font-bold text-gray-600 text-3xl" key={wallet.id}>
              {wallet.balance} {wallet.currency.value}
            </div>
          ))
        )
      }
    </div>
  )
}