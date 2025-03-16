import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/auth-layout";
import { Fee } from "../../../lib/types";
import { Switch } from "rizzui/switch";
import { Edit2 } from "lucide-react";
import { loadFees } from "../../../services/fees";
import FeesForm from "../../components/forms/fees-form";
import { Button } from "rizzui/button";
import { ActionIcon } from "rizzui/action-icon";
import axiosInstance from "../../../services/axios";
import { notify } from "../../../utils/functions";
import { Loader } from "rizzui/loader";

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toUpdate, setToUpdate] = useState<Fee>()
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  async function toggleFeeStatus(fee: Fee) {
    setFees(prev => prev.map(f => f.id == fee.id ? ({ ...f, active: !f.active }) : f))
    await axiosInstance.patch(`/fees/${fee.id}/active`, { active: !fee.active })
    notify('Fee updated successfully')
  }

  const load = async () => {
    setLoading(true)
    setFees(await loadFees())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {
        (showAddModal || toUpdate) && (
          <FeesForm
            fee={toUpdate}
            onClose={() => {
              setToUpdate(undefined)
              setShowAddModal(false)
            }}
            onAdd={e => {
              setFees(prev => [...prev, e])
            }}
            onUpdate={(e) => {
              setFees(prev => prev.map(a => a.id == e.id ? e : a))
            }}
          />
        )
      }
      <AuthLayout title="Configuration des frais">
        <div className="flex flex-col gap-3">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Fees List</h2>
            <Button onClick={() => setShowAddModal(true)}>
              Add
            </Button>
          </div>
          {
            loading ? (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            ) : (
              <div className="border-t border-gray-200">
                <div className="divide-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {fees.map((fee) => (
                    <div key={fee.id} className="px-4 py-4 border sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{fee.name}</h3>
                            <span className={`ml-2 px-2.5 py-0.5 rounded-full text-sm font-medium ${fee.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {fee.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{fee.description}</p>
                          <div className="mt-2">
                            <span className="text-sm font-medium text-gray-900">
                              {fee.amount} {fee.currency?.value}
                            </span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{fee.recurringType}</span>
                            {fee.concernedUsers.length > 0 && (
                              <>
                                <span className="mx-2 text-gray-500">•</span>
                                <span className="text-sm text-gray-500">
                                  For: {fee.concernedUsers.join(', ')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Switch
                            checked={fee.active}
                            onChange={() => toggleFeeStatus(fee)}
                          />
                          <ActionIcon
                            onClick={() => setToUpdate(fee)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="h-5 w-5" />
                          </ActionIcon>
                        </div>
                      </div>
                    </div>
                  ))}
                  {fees.length === 0 && (
                    <li className="px-4 py-8 sm:px-6 text-center text-gray-500">
                      No fees found. Click "Add New Fee" to create one.
                    </li>
                  )}
                </div>
              </div>
            )
          }
        </div>
      </AuthLayout>
    </>
  )
}
