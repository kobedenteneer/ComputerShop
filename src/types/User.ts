export interface User {
  id: number
  username: string
  password: string
  role?: string
}

export interface UserState {
  user: User | null
}

export interface UserData {
  user: User
}
