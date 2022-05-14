import Token from "../utils/Token"
import {TokenData} from "../interfaces/auth.interface"
import {redisAdd, redisDelSuffix} from "../utils/redis.client"

class TokenService {

    public async newUserToken(userId: string, userEmail: string): Promise<TokenData> {
        const newToken = await Token.createUserToken(userId, userEmail)
        await redisDelSuffix(`${userId}_`)
        await redisAdd(newToken.jti, "available")
        return newToken
    }

    public async newWalletToken(address: string): Promise<TokenData> {
        const newToken = await Token.createWalletToken(address)
        await redisDelSuffix(`${address}_`)
        await redisAdd(newToken.jti, "available")
        return newToken
    }
}

export const tokenService = new TokenService()