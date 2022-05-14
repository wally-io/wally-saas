export interface UserTokenData {
  userId: number
  email: string
  jti: string
}

export interface WalletTokenData {
  wallet: string
  jti: string
}

export interface TokenData {
  token: string
  expiresIn: number
  jti: string
}

export interface UserDto {
  id: number
  identifier: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface WalletDto {
  id: number
  identifier: string
  address: string
  createdAt: Date
  updatedAt: Date
}