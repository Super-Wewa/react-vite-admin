import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/auth-layout";
import { Province } from "../../../lib/types";
import { getProvinces } from "../../../services/provinces";
import { Loader } from "rizzui/loader";
import { Switch } from "rizzui/switch";

export default function ProvincesPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<Province[]>([])

  const load = async () => {
    setLoading(true)
    setProvinces(await getProvinces())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <AuthLayout title="Provinces">
      <div className="w-full flex flex-col gap-5 p-5 items-center justify-center">
        {
          loading ? (
            <Loader />
          ) : (
            <div className="relative w-full overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Active
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    provinces.map(
                      (province, index) => (
                        <tr key={index.valueOf()} className="bg-white border-b border-gray-200">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {province.name}
                          </th>
                          <td className="px-6 py-4">
                            <Switch
                              checked={province.active}
                            />
                          </td>
                          {/* <td className="px-6 py-4">
                            <button disabled={!province.active} className="bg-opacity-100 disabled:opacity-45 disabled:cursor-not-allowed">
                            </button>
                          </td> */}
                        </tr>
                      )
                    )
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </AuthLayout>
  )
}