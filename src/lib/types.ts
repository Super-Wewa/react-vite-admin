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

export type Bike = {
  id: string
  model: string
  color: string
  plaque: string
}

export enum UserType {
  driver = 'DRIVER',
  passenger = 'PASSENGER'
}

export type User = {
  id: string
  name?: string
  email?: string
  phone?: string
  active: boolean
  type: UserType
  isTester: boolean
  stars: number[]
  profilePicture?: string
  online?: boolean
  adress: string
  birthDate: string
  deleted: boolean
  bike?: Bike
  province?: Province
}
