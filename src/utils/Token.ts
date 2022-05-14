import {UserTokenData, TokenData, WalletTokenData} from "../interfaces/auth.interface"
import {config as jwtConfig} from "../config/jwt"
import jwt from "jsonwebtoken"
import {nanoid} from "nanoid"

const {secret, secretRefresh, algorithms} = jwtConfig

const expiration1month = 30 * 24 * 60 * 60 * 1000
const expiration4hours = 4 * 60 * 60 * 1000

export default class Token {

    public static getIdentifier(data: string | number): string {
        return `${data}_${nanoid()}`
    }

    public static async createUserToken(userId: number, email: string, expiresIn: number = expiration1month): Promise<TokenData> {
        const dataStoredInToken: UserTokenData = {
            userId: userId,
            email: email,
            jti: this.getIdentifier(userId)
        }

        const token = jwt.sign(dataStoredInToken, secret!, {
            algorithm: algorithms[0],
            expiresIn,
        })

        return {
            expiresIn,
            token,
            jti: dataStoredInToken.jti
        }
    }

    public static async createWalletToken(address: string, expiresIn: number = expiration1month): Promise<TokenData> {
        const dataStoredInToken: WalletTokenData = {
            wallet: address,
            jti: this.getIdentifier(address)
        }

        const token = jwt.sign(dataStoredInToken, secret!, {
            algorithm: algorithms[0],
            expiresIn,
        })

        return {
            expiresIn,
            token,
            jti: dataStoredInToken.jti
        }
    }
}