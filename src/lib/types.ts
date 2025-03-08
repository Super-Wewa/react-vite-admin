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

export type Province = {
  id: string
  name: string
  active: boolean
}
