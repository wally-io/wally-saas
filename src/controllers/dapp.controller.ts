import {Empty, EmptyRequest, QueryRequest, UserBodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    CreateDappRequest, AllDAppResponse,
    FindWalletsRequest,
    FindWalletsResponse,
} from "../dtos/dapp"
import {dappService} from "../services/dapps.service"
import Errors from "../utils/Errors"
import {dappAuthorizationsService} from "../services/dapp-authorizations.service"
import {groupBy} from "../utils/map"
import {isNull} from "../utils/checks"

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
                    identifier: dapp.identifier,
                    name: dapp.name,
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
            throw Errors.NOT_IMPLEMENTED()
        } catch (error) {
            next(error)
        }
    }

    public create = async (req: UserBodyRequest<CreateDappRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const caller = req.user
            const payload = req.body
            await dappService.create(caller.id, payload.name, payload.authorizationRequest)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}