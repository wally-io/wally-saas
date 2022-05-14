import {NextFunction, Response} from "express";
import {BodyRequest, Empty} from "../interfaces/api.interface";
import {userService} from "../services/user.service";
import {RegisterRequest} from "../dtos/auth"

export default class AuthRegisterController {

    public register = async (req: BodyRequest<RegisterRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const payload = req.body
            await userService.createUser(payload.email, payload.password)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}