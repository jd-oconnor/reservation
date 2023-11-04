export interface IClient {
  id: number
  name: string
  email: string
  reservations: Array<IReservation>
}

export interface IReservation {
  id: number
  date: string
  time: string
  providerId: number
  providerName: string
  isConfirmed: boolean
  createdAt: Date
}

export interface IProvider {
  id: number
  name: string
  email: string
  schedule: Array<ISchedule>
}

export interface ISchedule {
  day: string
  start: string
  end: string
}

export type UserType = IClient | IProvider
