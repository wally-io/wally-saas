import {QueryRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    FindWalletsRequest,
    FindWalletsResponse,
} from "../dtos/dapp"

export default class DappController {
    public findWallets = async (req: QueryRequest<FindWalletsRequest>, res: Response<FindWalletsResponse>, next: NextFunction) => {
        try {
            const payload = req.query
            // TODO
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}