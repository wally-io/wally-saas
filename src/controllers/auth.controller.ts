import {NextFunction, Response} from "express"
import {UserEmptyRequest, BodyRequest, Empty} from "../interfaces/api.interface"
import {userService} from "../services/user.service"
import {tokenService} from "../services/token.service"
import Errors from "../utils/Errors"
import {LoginRequest} from "../dtos/auth"
import {TokenResponse} from "../dtos/token"
import {UserResponse} from "../dtos/user"

export default class AuthController {

    public getMe = async (req: UserEmptyRequest, res: Response<UserResponse>, next: NextFunction) => {
        const caller = req.user
        return res.status(200).json({
            id: caller.id,
            email: caller.email,
            createdAt: caller.createdAt,
            updatedAt: caller.updatedAt
        })
    }

    public logout = async (req: UserEmptyRequest, res: Response<Empty>, next: NextFunction) => {
        try {
            const token = req.token
            throw Errors.NOT_IMPLEMENTED()
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: BodyRequest<LoginRequest>, res: Response<TokenResponse>, next: NextFunction) => {
        try {
            const payload = req.body

            const user = await userService.getByEmail(payload.email)

            const isValidPassword = user.comparePasswords(payload.password)
            if (!isValidPassword) {
                throw Errors.REJECTED_Password()
            }

            const newToken = await tokenService.newUserToken(user.id, user.email)

            res.status(200).json({
                token: newToken.token,
                expireAt: new Date(Date.now() + newToken.expiresIn)
            })
        } catch (error) {
            next(error)
        }
    }
}