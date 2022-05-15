import {UserTokenData, UserDto, WalletTokenData, WalletDto} from "./auth.interface"


/** User from Saas Admin Panel */
export interface UserBodyRequest<T> extends Express.Request {
    token: UserTokenData
    user: UserDto
    body: T
}

export interface UserEmptyRequest extends Express.Request {
    token: UserTokenData
    user: UserDto
}

export interface UserQueryRequest<T> extends Express.Request {
    token: UserTokenData
    user: UserDto
    query: T
}

/** User from Wallet App */
export interface WalletMixRequest<T, Z> extends Express.Request {
    token: WalletTokenData
    wallet: WalletDto
    body: T
    query: Z
}

export interface WalletBodyRequest<T> extends Express.Request {
    token: WalletTokenData
    wallet: WalletDto
    body: T
}

export interface WalletEmptyRequest extends Express.Request {
    token: WalletTokenData
    wallet: WalletDto
}

export interface WalletQueryRequest<T> extends Express.Request {
    token: WalletTokenData
    wallet: WalletDto
    query: T
}

/** no Auth */
export interface BodyRequest<T> extends Express.Request {
    body: T
}

export interface QueryRequest<T> extends Express.Request {
    query: T
}

export interface EmptyRequest extends Express.Request {
}

export interface Empty {
}