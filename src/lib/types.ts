export type Admin = {
  id: string
  name: string
  email: string
  active: boolean
}

export type LoginDto = {
  email: string
  password: string
}
