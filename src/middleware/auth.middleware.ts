import {NextFunction, Request, Response} from "express"
import db from "../db/database"
import {UserTokenData, UserDto, WalletTokenData, WalletDto} from "../interfaces/auth.interface"
import {logger} from "../utils/logger"
import {config as jwtConfig} from "../config/jwt"
import jwt from "jsonwebtoken"
import {redisExists} from "../utils/RedisClient"
import {isNotNull, isNull, throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors";
import {userService} from "../services/users.service"
import {walletService} from "../services/wallets.service"

const {secret} = jwtConfig

declare global {
    namespace Express {
        interface Request {
            user?: UserDto | undefined
            wallet?: WalletDto | undefined
            token?: UserTokenData | WalletTokenData | undefined
        }
    }
}

const validateUserToken = async <R extends Request>(req: R, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.header("Authorization")?.split("Bearer ")[1] || null

        throwIfNull(Authorization, Errors.REQUIRE_Token())

        const payload: any = jwt.verify(Authorization!, secret!)

        if (isNull(payload.userId)) {
            throw Errors.INVALID_Token()
        }
        const tokenData = payload as UserTokenData

        if (!await redisExists(tokenData.jti)) {
            throw Errors.INVALID_Token()
        }

        const foundUser = await userService.findById(tokenData.userId)

        throwIfNull(foundUser, Errors.NOT_FOUND_User("Authentication token is linked to an unknown user."))

        req.user = foundUser!.toJSON() as UserDto
        req.token = tokenData
        next()
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const validateWalletToken = async <R extends Request>(req: R, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.header("Authorization")?.split("Bearer ")[1] || null

        throwIfNull(Authorization, Errors.REQUIRE_Token())

        const payload: any = jwt.verify(Authorization!, secret!) as unknown as WalletTokenData

        if (isNull(payload.wallet)) {
            throw Errors.INVALID_Token()
        }
        const tokenData = payload as WalletTokenData

        if (!await redisExists(tokenData.jti)) {
            throw Errors.INVALID_Token()
        }

        const foundWallet = await walletService.findByAddress(tokenData.wallet)

        throwIfNull(foundWallet, Errors.NOT_FOUND_Wallet("Authentication token is linked to an unknown wallet."))

        req.wallet = foundWallet! as WalletDto
        req.token = tokenData
        next()
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export {
    validateUserToken,
    validateWalletToken
}