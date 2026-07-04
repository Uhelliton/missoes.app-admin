export interface AuthPayload {
    username: string
    password: string
}

export interface Role {
  uuid: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface User {
  uuid: string
  name: string
  email: string
  document: string
  phoneNumber: string | null
  username: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  roles: Role[]
}

export interface AuthResponse {
  user: User
  token: string
  expiresAt: string
}
