export interface UserTokenData {
  userId: string
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
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface WalletDto {
  id: string
  address: string
  createdAt: Date
  updatedAt: Date
}