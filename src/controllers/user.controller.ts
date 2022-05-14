import {UserEmptyRequest, UserQueryRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {userService} from "../services/users.service"
import {UserModel} from "../models/users.model"
import {isNotEmpty, throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"
import {UserAllResponse, UserFindRequest, UserResponse} from "../dtos/user"

export default class UserController {
    public find = async (req: UserQueryRequest<UserFindRequest>, res: Response<UserResponse>, next: NextFunction) => {
        try {
            const payload = req.query

            let user: UserModel | undefined = undefined

            if (isNotEmpty(payload.email)) {
                user = await userService.getByEmail(payload.email!)
            }
            if (isNotEmpty(payload.userId)) {
                user = await userService.getById(parseInt(payload.userId!))
            }
            throwIfNull(user, Errors.MISSING_Filter())
            res.status(200).json({
                id: user!.id,
                email: user!.email,
                identifier: user!.identifier,
                createdAt: user!.createdAt,
                updatedAt: user!.updatedAt
            })
        } catch (error) {
            next(error)
        }
    }
    public all = async (req: UserEmptyRequest, res: Response<UserAllResponse>, next: NextFunction) => {
        const users = await userService.getAll()
        try {
            res.status(200).json({
                users: users.map(user => {
                    return {
                        id: user.id,
                        email: user.email,
                        identifier: user.identifier,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }
}