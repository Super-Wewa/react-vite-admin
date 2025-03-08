/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "rizzui/input";
import AuthLayout from "../../layouts/auth-layout";
import { useSearchParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "../../../lib/types";
import { getUsers } from "../../../services/users";
import { Loader } from "rizzui/loader";
import { Button } from "rizzui/button";
import UserTableDisplay from "../../components/sections/user-table-display";

export default function UsersPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const typeKey = searchParams.get('type')

  const toDisplay = useMemo(() => {
    const t = searchTerm.toLowerCase()
    return users.filter((u) => {
      return u.name?.toLowerCase().includes(t) || u.email?.includes(t) || u.phone?.includes(t)
    })
  }, [users, searchTerm])

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setUsers(await getUsers((typeKey as any) ?? undefined))
    setLoading(false)
  }, [typeKey])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return (
    <AuthLayout title={`Utilisateurs: ${toDisplay.length}`}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="w-fit flex items-center gap-2">
            <Button onClick={() => {
              setSearchParams(prev => {
                prev.delete('type')
                return prev
              })
            }} variant={!typeKey ? 'solid' : 'outline'}>
              Tous
            </Button>
            <Button onClick={() => {
              setSearchParams(prev => {
                prev.set('type', 'drivers')
                return prev
              })
            }} variant={typeKey == 'drivers' ? 'solid' : 'outline'}>
              Motards
            </Button>
            <Button onClick={() => {
              setSearchParams(prev => {
                prev.set('type', 'passengers')
                return prev
              })
            }} variant={typeKey == 'passengers' ? 'solid' : 'outline'}>
              Clients
            </Button>
          </div>
          <Input
            placeholder="Rechercher"
            className="w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-center">
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
                        Adresse email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Numéro
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Province
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Moto
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actif
                      </th>
                      <th scope="col" className="px-6 py-3">
                        En ligne
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      toDisplay.map(
                        (user, index) => (
                          <UserTableDisplay
                            user={user}
                            key={index.valueOf()}
                            onUpdate={(u) => {
                              setUsers(prev => prev.map(a => a.id == u.id ? u : a))
                            }}
                          />
                        )
                      )
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
    </AuthLayout>
  )
}