import Errors from "../utils/Errors"
import db from "../db/database"
import {WalletDAppModel} from "../models/wallet-dapps.model"
import {dappAuthorizationsService} from "./dapp-authorizations.service"
import {walletDAppAuthorizationsService} from "./wallet-dapp-authorizations.service"
import {WalletDAppAuthorizationRequest} from "../dtos/wallet/dapp"
import {associateBy} from "../utils/map"

class WalletDAppService {
    private walletDApps = db.WalletDApps

    public async findByWalletId(walletId: string): Promise<WalletDAppModel[]> {
        return await this.walletDApps.findAll({
            where: {walletId: walletId}
        });
    }


    public async findByDAppId(dappId: string): Promise<WalletDAppModel[]> {
        return await this.walletDApps.findAll({
            where: {dappId: dappId}
        });
    }

    public async updateDAppAuthorizations(walletId: string, dappId: string, authorizations: WalletDAppAuthorizationRequest[]) {
        if (!await this.linkExists(walletId, dappId)) {
            throw Errors.NOT_OWNER()
        }

        for (const authorization of authorizations) {
            const rule = await walletDAppAuthorizationsService.getById(authorization.walletDAppAuthorizationId)
            if (rule.dappId !== dappId || rule.walletId !== walletId) {
                throw Errors.NOT_OWNER()
            }
            await rule.update({
                authorized: authorization.authorized
            })
        }
    }

    public async connectDApp(walletId: string, dappId: string, authorizations: WalletDAppAuthorizationRequest[]): Promise<WalletDAppModel> {

        if (await this.linkExists(walletId, dappId)) {
            throw Errors.CONFLICT("wallet", walletId)
        }
        const link = await this.walletDApps.create({
            walletId: walletId,
            dappId: dappId
        })

        const allAuthorizations = await dappAuthorizationsService.findAllByDAppId(dappId)
        const authorizationMapped = associateBy(authorizations, "dappAuthorizationId")

        for (const authorization of allAuthorizations) {
            const isAuthorized: boolean = authorizationMapped[authorization.id]?.authorized === true
            await walletDAppAuthorizationsService.create(
                walletId,
                authorization.dappId,
                authorization.id,
                isAuthorized
            )
        }

        return link
    }

    public async linkExists(walletId: string, dappId: string): Promise<boolean> {
        return await this.walletDApps.findOne({
            where: {
                walletId: walletId,
                dappId: dappId
            }
        }) != undefined
    }
}

export const walletDAppService = new WalletDAppService()