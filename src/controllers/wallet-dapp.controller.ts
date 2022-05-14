import {
    Empty,
    WalletQueryRequest,
    WalletBodyRequest,
    WalletEmptyRequest, UserQueryRequest
} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    FindAuthorizationsRequest, FindAuthorizationsResponse,
    UpdateAuthorizationsRequest,
    FindWalletDAppsResponse, ConnectDAppRequest, GetDAppConnectLinkRequest, GetDAppConnectLinkResponse,
} from "../dtos/wallet/dapp"
import {walletDAppService} from "../services/wallet-dapp.service"
import {Endpoint} from "../enums"
import {dappService} from "../services/dapp.service"
import {dappAuthorizationsService} from "../services/dapp-authorizations.service"
import {walletDAppAuthorizationsService} from "../services/wallet-dapp-authorizations.service"
import {associateBy} from "../utils/map"

export default class WalletDappController {
    public findDApps = async (req: WalletEmptyRequest, res: Response<FindWalletDAppsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const data = await walletDAppService.findByDAppId(wallet.id)
            const dapps = await dappService.findByIds(data.map(it => it.dappId))
            res.status(200).json({
                dapps: dapps.map(wallet => {
                    return {
                        id: wallet.id,
                        name: wallet.name
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public getAuthorizations = async (req: WalletQueryRequest<FindAuthorizationsRequest>, res: Response<FindAuthorizationsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.query

            const authorizations = await walletDAppAuthorizationsService.findAll(wallet.id, payload.dappId)
            const allAuthorizations = await dappAuthorizationsService.findAllByDAppId(payload.dappId)
            const authorizationMapped = associateBy(authorizations, "dappAuthorizationId")

            const result = allAuthorizations.map(authorization => {
                const isAuthorized: boolean = authorizationMapped[authorization.id]?.authorized === true
                return {
                    authorized: isAuthorized,
                    transactionType: authorization.transactionType,
                    targetType: authorization.targetType,
                    targetName: authorization.targetName,
                    targetAddress: authorization.targetAddress,
                    reason: authorization.reason
                }
            })
            res.status(200).json({
                authorizations: result
            })
        } catch (error) {
            next(error)
        }
    }

    public updateAuthorizations = async (req: WalletBodyRequest<UpdateAuthorizationsRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            await walletDAppService.updateDAppAuthorizations(wallet.id, payload.dappId, payload.authorizations)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public getConnectLink = async (req: UserQueryRequest<GetDAppConnectLinkRequest>, res: Response<GetDAppConnectLinkResponse>, next: NextFunction) => {
        try {
            const user = req.user
            const payload = req.query

            // TODO can leverage client backend auth on secondary users with roles
            const dapp = await dappService.getByOwner(user.id)

            res.status(200).json({
                path: `${Endpoint.WALLET_DAPP_Connect}?dappId=${dapp.id}&dappUserIdentifier=${payload.dappUserIdentifier}`
            })
        } catch (error) {
            next(error)
        }
    }

    public connect = async (req: WalletBodyRequest<ConnectDAppRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            await walletDAppService.connectDApp(wallet.id, payload.dappId, payload.authorizations)

            // TODO notify dapp (with callback) that wallet.address is connected for dappUserIdentifier

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}