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
    FindDappsResponse, ConnectDAppRequest,
} from "../dtos/wallet/dapp"
import Errors from "../utils/Errors"
import {walletDAppService} from "../services/wallet-dapp.service"

export default class WalletDappController {
    public find = async (req: WalletEmptyRequest, res: Response<FindDappsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            throw Errors.NOT_IMPLEMENTED()
        } catch (error) {
            next(error)
        }
    }

    public getAuthorizations = async (req: WalletQueryRequest<FindAuthorizationsRequest>, res: Response<FindAuthorizationsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.query
            throw Errors.NOT_IMPLEMENTED()
        } catch (error) {
            next(error)
        }
    }

    public updateAuthorizations = async (req: WalletBodyRequest<UpdateAuthorizationsRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            throw Errors.NOT_IMPLEMENTED()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public connect = async (req: WalletBodyRequest<ConnectDAppRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            await walletDAppService.createLink(wallet.id, payload.dappIdentifier, payload.authorizations)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}