import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { Button, Input, Password } from 'rizzui'
import { login } from "../../../services/auth"
import { useAuthStore } from "../../../store/auth-store"

export default function LoginScreen() {
  const { setUser, setToken } = useAuthStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = await login(form)
    if (data) {
      setToken(data.token)
      setUser(data.user)
      window.location.reload()
    }
    setLoading(false)
  }

  const isDisabled = useMemo(() => {
    return loading || !form.email || !form.password
  }, [form, loading])

  return (
    <div className="w-full bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-600 p-5 rounded-md flex flex-col gap-5 items-center text-white">
        <h2 className="font-bold">
          Identifiez-vous
        </h2>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={onInputChange}
            label="Adresse email"
          />
          <Password
            name="password"
            value={form.password}
            onChange={onInputChange}
            label="Mot de passe"
          />
          <Button type="submit" isLoading={loading} disabled={isDisabled}>
            Continuer
          </Button>
        </form>
      </div>
    </div>
  )
}
