import { useEffect, useState } from "react";
import { Breakpoint } from "../../../lib/types";
import { loadBreakpoints } from "../../../services/breakpoints";
import AuthLayout from "../../layouts/auth-layout";
import { Loader, Plus } from "lucide-react";
import { Button } from "rizzui/button";
import { BreakpointCard } from "../../components/atoms/bonus-card";
import { BreakpointForm } from "../../components/forms/breakpoints-form";

export default function BonusesPage() {
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [toUpdate, setToUpdate] = useState<Breakpoint>()
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  const loadData = async () => {
    setLoading(true)
    setBreakpoints(await loadBreakpoints())
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      {
        (toUpdate || showAddModal) && (
          <BreakpointForm
            onClose={() => {
              setToUpdate(undefined)
              setShowAddModal(false)
            }}
            onSubmit={(e) => {
              setBreakpoints(prev => prev.some(a => a.id == e.id) ? prev.map(a => a.id == e.id ? e : a) : [...prev, e])
            }}
            breakpoint={toUpdate}
            onUpdate={() => loadData()}
          />
        )
      }
      <AuthLayout title="Configuration des bonuses">
        <div className="w-full flex flex-col gap-4">
          <header className="bg-white shadow">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Breakpoint
                </Button>
              </div>
            </div>
          </header>
          {
            loading ? (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            ) : (
              <main className="w-full mx-auto py-8">
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[...breakpoints].sort((a, b) => a.tripsCount - b.tripsCount).map((breakpoint) => (
                    <div key={breakpoint.id} onClick={() => setToUpdate(breakpoint)} className=" cursor-pointer">
                      <BreakpointCard breakpoint={breakpoint} />
                    </div>
                  ))}
                </div>
              </main>
            )
          }
        </div>
      </AuthLayout>
    </>
  )
}