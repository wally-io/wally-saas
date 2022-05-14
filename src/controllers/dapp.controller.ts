import {Empty, EmptyRequest, QueryRequest, UserBodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    CreateDappRequest, AllDAppResponse,
    FindWalletsRequest,
    FindWalletsResponse,
} from "../dtos/dapp"
import {dappService} from "../services/dapp.service"
import {dappAuthorizationsService} from "../services/dapp-authorizations.service"
import {groupBy} from "../utils/map"
import {isNull} from "../utils/checks"
import {walletDAppService} from "../services/wallet-dapp.service"
import {walletService} from "../services/wallet.service"

export default class DappController {
    public all = async (req: EmptyRequest, res: Response<AllDAppResponse>, next: NextFunction) => {
        try {
            const dapps = await dappService.getAll()
            const dappAuthorizations = await dappAuthorizationsService.getAll()
            const authorizationsGrouped = groupBy(dappAuthorizations, "dappId")
            const result = dapps.map(dapp => {
                const authorizations = authorizationsGrouped[dapp.id]
                return {
                    id: dapp.id,
                    name: dapp.name,
                    callback: dapp.callback,
                    authorizations: (isNull(authorizations) ? [] : authorizations).map(authorization => {
                        return {
                            transactionType: authorization.transactionType,
                            targetType: authorization.targetType,
                            targetName: authorization.targetName,
                            targetAddress: authorization.targetAddress,
                            reason: authorization.reason
                        }
                    })
                }
            })
            res.status(200).json({
                dapps: result
            })
        } catch (error) {
            next(error)
        }
    }

    public findWallets = async (req: QueryRequest<FindWalletsRequest>, res: Response<FindWalletsResponse>, next: NextFunction) => {
        try {
            const payload = req.query
            const data = await walletDAppService.findByDAppId(payload.dappId)
            const wallets = await walletService.findByIds(data.map(it => it.walletId))
            res.status(200).json({
                wallets: wallets.map(wallet => wallet.address)
            })
        } catch (error) {
            next(error)
        }
    }

    public create = async (req: UserBodyRequest<CreateDappRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const caller = req.user
            const payload = req.body
            await dappService.create(caller.id, payload.name, payload.callback, payload.authorizationRequest)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}