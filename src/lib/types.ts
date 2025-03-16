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

export type WalletBalance = {
  currency: Currency
}

export type Transaction = {
  id: string
  reference: string
  amount: number
  cash: boolean
  wallet: WalletBalance
}

export type Currency = {
  id: string
  name: string
  value: string
  active: boolean
}

export type TripLocations = {
  from: Location
  to: Location
  distance: number
}

export type Location = {
  latitude: number
  longitude: number
  heading: number
  name: string
}

export type TripTimestamps = {
  createdAt: string
  driverAcceptedAt?: string
  begin?: string
  end?: string
  canceledAt?: string
}

export type TripCashPayment = {
  id: string
  amount: number
  currency: Currency
}

export type Trip = {
  id: string
  locations: TripLocations
  timeStamps: TripTimestamps
  user: User
  driver?: User
  canceled: boolean
  ended: boolean
  transaction?: Transaction
  cash?: TripCashPayment
  passengerRate?: number
  driverRate?: number
}

export enum FeesRecurringType {
  NEVER = 'NEVER',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface Fee {
  id: string;
  name: string;
  description: string;
  descriptionUrl?: string;
  recurringType: FeesRecurringType;
  amount: number;
  currencyId: string;
  daylyDays: number[];
  active: boolean;
  concernedUsers: UserType[];
  createdAt: string;
  updatedAt: string;
  currency?: Currency;
}

export interface Reward {
  uid: string;
  id: string;
  currencyId: string;
  amount: number;
  breakpointId: string;
  createdAt: string;
  updatedAt: string;
  currency: Currency;
}

export interface Breakpoint {
  uid: string;
  id: string;
  active: boolean;
  tripsCount: number;
  createdAt: string;
  updatedAt: string;
  rewards: Reward[];
}
