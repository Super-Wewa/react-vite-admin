import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Breakpoint } from '../../../lib/types';
import { Input } from 'rizzui/input';
import { useCurrenciesStore } from '../../../store/currencies-store';
import { createBreakpoint, updateBreakpoint, updateBreakpointBonus } from '../../../services/breakpoints';
import { notify } from '../../../utils/functions';

interface BreakpointFormProps {
  breakpoint?: Breakpoint;
  onSubmit: (data: Breakpoint) => void;
  onClose: () => void;
  onUpdate: () => void
}

export function BreakpointForm({ breakpoint, onSubmit, onClose, onUpdate }: BreakpointFormProps) {
  const { currencies, loadCurrencies } = useCurrenciesStore()
  const [formData, setFormData] = useState({
    tripsCount: breakpoint?.tripsCount || 0,
    active: breakpoint?.active ?? true,
    amount: breakpoint?.rewards[0]?.amount || 0,
  });
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    loadCurrencies()
  }, [loadCurrencies])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (breakpoint) {
      await updateBreakpoint(breakpoint.id, { active: formData.active, tripsCount: formData.tripsCount })
      await updateBreakpointBonus(breakpoint.rewards[0].id, { amount: formData.amount, currencyId: currencies[0].id })
      onClose()
      onUpdate()
    } else {
      const b = await createBreakpoint({ ...formData, currencyId: currencies[0].id })
      if (b) {
        onSubmit(b)
        onClose()
        notify('Trip breakpoint created successfully')
      }
    }
    setLoading(false)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {breakpoint ? 'Edit Breakpoint' : 'Create New Breakpoint'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tripsCount" className="block text-sm font-medium text-gray-700">
              Required Trips
            </label>
            <Input
              type="number"
              id="tripsCount"
              value={formData.tripsCount}
              onChange={(e) => setFormData({ ...formData, tripsCount: parseInt(e.target.value) })}
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="rewardAmount" className="block text-sm font-medium text-gray-700">
              Reward Amount (CDF)
            </label>
            <Input
              type="number"
              id="rewardAmount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 cursor-pointer block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Saving...' : breakpoint ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
