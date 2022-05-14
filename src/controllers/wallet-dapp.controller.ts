import {
    Empty,
    WalletQueryRequest,
    WalletBodyRequest,
    WalletEmptyRequest
} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    FindAuthorizationsRequest, FindAuthorizationsResponse,
    UpdateAuthorizationsRequest,
    FindDappsResponse,
} from "../dtos/wallet/dapp"

export default class WalletDappController {
    public find = async (req: WalletEmptyRequest, res: Response<FindDappsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            // TODO
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public getAuthorisations = async (req: WalletQueryRequest<FindAuthorizationsRequest>, res: Response<FindAuthorizationsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.query
            // TODO
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public updateAuthorisations = async (req: WalletBodyRequest<UpdateAuthorizationsRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            // TODO
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}