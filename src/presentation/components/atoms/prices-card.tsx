import { useEffect, useState } from "react";
import { TripPrice } from "../../../lib/types";
import { Loader } from "rizzui/loader";
import { Input } from "rizzui/input";
import { ActionIcon } from "rizzui/action-icon";
import { FaSave } from "react-icons/fa";
import { getPrices, upsertTripPrice } from "../../../services/trip-prices";
import { notify } from "../../../utils/functions";

export default function PricesControlCard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [prices, setPrices] = useState<TripPrice[]>([])
  const [forms, setForms] = useState<{ id: string, price: number }[]>()

  useEffect(() => {
    setForms(prices.map(p => ({ id: p.id, price: p.price })))
  }, [prices])

  const loadData = async () => {
    setLoading(true)
    setPrices(await getPrices())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const onUpdate = async (e: { id: string, price: number }) => {
    const d = prices.find(a => a.id == e.id)
    if (!d) return
    setPrices(prev => prev.map(a => a.id == d?.id ? d : a))
    const p = await upsertTripPrice({ currencyId: d.currency.id, price: e.price })
    if (p) {
      notify('Prix modifié avec succès')
      setPrices(prev => prev.map(a => a.id == p.id ? p : a))
    }
  }

  return (
    <div className="w-full flex flex-col p-4 gap-4 rounded-md shadow-xl">
      <h2 className="font-semibold underline text-lg text-c-primary">
        Prix des courses par KM
      </h2>
      {
        loading ? (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        ) : (
          prices.map((price) => (
            <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col gap-2" key={price.id}>
              <div className="w-full relative">
                <Input
                  type="number"
                  value={forms?.find(a => a.id == price.id)?.price ?? 0}
                  onChange={(e) => setForms(prev => (prev ?? []).map(a => a.id == price.id ? ({ ...a, price: Number(e.target.value) }) : a))}
                  inputClassName="w-full pr-12"
                />
                <span className="absolute top-0 right-0 p-2">
                  {price.currency.value}
                </span>
              </div>
              <ActionIcon onClick={() => onUpdate(forms!.find(a => a.id == price.id)!)}>
                <FaSave />
              </ActionIcon>
            </form>
          ))
        )
      }
    </div>
  )
}
