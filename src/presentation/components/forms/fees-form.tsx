import { FormEvent, useEffect, useState } from "react";
import { Fee, FeesRecurringType, UserType } from "../../../lib/types";
import { useCurrenciesStore } from "../../../store/currencies-store";
import { Drawer } from "rizzui/drawer";
import { Input } from "rizzui/input";
import { createFee, updateFee } from "../../../services/fees";
import { notify } from "../../../utils/functions";

export default function FeesForm({ onClose, onAdd, onUpdate, fee }: {
  onClose: () => void,
  onAdd: (f: Fee) => void
  onUpdate: (f: Fee) => void
  fee?: Fee
}) {
  const { currencies, loadCurrencies } = useCurrenciesStore()
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Fee>>({
    name: '',
    description: '',
    descriptionUrl: '',
    recurringType: FeesRecurringType.DAILY,
    amount: 0,
    currencyId: '',
    daylyDays: [],
    active: true,
    concernedUsers: []
  });

  useEffect(() => {
    if (!fee) return
    setForm({
      name: fee.name,
      description: fee.description,
      descriptionUrl: fee.descriptionUrl,
      recurringType: fee.recurringType,
      amount: fee.amount,
      currencyId: fee.currencyId,
      daylyDays: fee.daylyDays,
      active: fee.active,
      concernedUsers: fee.concernedUsers
    })
  }, [fee])

  useEffect(() => {
    loadCurrencies()
  }, [loadCurrencies])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const f = fee ? await updateFee(fee.id, form) : await createFee(form)
    if (f) {
      notify('Fee created successfully')
      if (fee) {
        onUpdate(f)
      } else {
        onAdd(f)
      }
      onClose()
    }
    setLoading(false)
  }

  return (
    <Drawer onClose={onClose} isOpen size="lg">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">
            {fee ? 'Edit Fee' : 'Create New Fee'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-200">
          <div className="px-4 py-5 space-y-6 sm:px-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(fee => ({ ...fee, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={form.description}
                onChange={e => setForm(fee => ({ ...fee, description: e.target.value }))}
                rows={3}
                className="mt-1 p-2 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description URL</label>
              <Input
                type="url"
                value={form.descriptionUrl || ''}
                onChange={e => setForm(fee => ({ ...fee, descriptionUrl: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <Input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={e => setForm(fee => ({ ...fee, amount: parseFloat(e.target.value) }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  required
                  value={form.currencyId}
                  onChange={e => setForm(fee => ({ ...fee, currencyId: e.target.value }))}
                  className="mt-1 block w-full p-[10px] rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {currencies.map(currency => (
                    <option key={currency.id} value={currency.id}>
                      ({currency.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Recurring Type</label>
              <select
                required
                value={form.recurringType}
                onChange={e => setForm(fee => ({ ...fee, recurringType: e.target.value as FeesRecurringType }))}
                className="mt-1 block w-full p-[10px] rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {Object.values(FeesRecurringType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {form.recurringType === FeesRecurringType.DAILY && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Days</label>
                <div className="mt-2 space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6].map(day => (
                    <label key={day} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.daylyDays?.includes(day)}
                        onChange={e => {
                          const days = form.daylyDays ?? [];
                          const newDays = e.target.checked
                            ? [...days, day]
                            : days.filter(d => d !== day);
                          setForm(fee => ({ ...fee, daylyDays: newDays }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][day]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Concerned Users</label>
              <div className="mt-2 space-y-2">
                {Object.values(UserType).map(userType => (
                  <label key={userType} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={form.concernedUsers?.includes(userType)}
                      onChange={e => {
                        const users = form.concernedUsers || [];
                        const newUsers = e.target.checked
                          ? [...users, userType]
                          : users.filter(type => type !== userType);
                        setForm(fee => ({ ...fee, concernedUsers: newUsers }));
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{userType}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={e => setForm(fee => ({ ...fee, active: e.target.checked }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? 'Saving...' : fee ? 'Update Fee' : 'Create Fee'}
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}