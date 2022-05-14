import {BodyRequest, Empty} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {RegisterRequest} from "../dtos/wallet/register"

export default class WalletRegisterController {

    public register = async (req: BodyRequest<RegisterRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const payload = req.body
            // TODO
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}