import { useEffect, useState } from "react"
import { Trip } from "../../../lib/types"
import AuthLayout from "../../layouts/auth-layout"
import { Loader } from "rizzui/loader"
import TripPreview from "../../components/atoms/trip-preview"
import { getTrips } from "../../../services/trips"
import { Button } from "rizzui/button"
import { FaSync } from "react-icons/fa"

export default function TripsPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [trips, setTrips] = useState<Trip[]>([])
  const [filters, setFilters] = useState({
    start: new Date(new Date().setHours(1, 0, 0, 0)),
    end: new Date(),
  })

  const loadTrips = async () => {
    setLoading(true)
    setTrips(await getTrips({ start: filters.start.toISOString(), end: filters.end.toISOString() }))
    setLoading(false)
  }

  useEffect(() => {
    loadTrips()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthLayout title={`Courses: ${trips.length}`}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center gap-8">
          <div className="w-fit flex items-center gap-3">
            <input
              type="date"
              name="start"
              id="start"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value + "T01:00:00");
                setFilters(prev => ({
                  ...prev,
                  start: selectedDate
                }));
              }}
              className="p-[6px] rounded-sm border"
              value={filters.start.toISOString().slice(0, 10)}
            />
            <input
              type="date"
              name="date"
              id="end"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value + "T00:00:00");
                setFilters(prev => ({
                  ...prev,
                  end: new Date(selectedDate.setHours(23, 59, 59, 999))
                }));
              }}
              className="p-[6px] rounded-sm border"
              value={filters.end.toISOString().slice(0, 10)}
            />
            {
              !loading && (
                <Button className="flex items-center gap-2" variant="outline" onClick={loadTrips}>
                  <FaSync />
                  <span>
                    Actualiser
                  </span>
                </Button>
              )
            }
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          {
            loading ? (
              <Loader />
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                {
                  trips.map((trip, index) => (
                    <TripPreview
                      trip={trip}
                      key={index.valueOf()}
                    />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </AuthLayout>
  )
}
