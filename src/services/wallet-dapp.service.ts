import Errors from "../utils/Errors"
import db from "../db/database"
import {dappService} from "./dapps.service"
import {WalletDAppModel} from "../models/wallet-dapps.model"
import {dappAuthorizationsService} from "./dapp-authorizations.service"
import {walletDAppAuthorizationsService} from "./wallet-dapp-authorizations.service"
import {DAppAuthorization} from "../dtos/wallet/dapp"
import {associateBy} from "../utils/map"

class WalletDAppService {
    private walletDApps = db.WalletDApps

    public async createLink(walletId: number, dappIdentifier: string, authorizations: DAppAuthorization[]): Promise<WalletDAppModel> {
        const dapp = await dappService.getByIdentifier(dappIdentifier)

        if (await this.linkExists(walletId, dapp.id)) {
            throw Errors.CONFLICT("wallet", walletId)
        }
        const link = await this.walletDApps.create({
            walletId: walletId,
            dappId: dapp.id
        })

        const allAuthorizations = await dappAuthorizationsService.findAllByDAppId(dapp.id)
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

    public async linkExists(walletId: number, dappId: number): Promise<boolean> {
        return await this.walletDApps.findOne({
            where: {
                walletId: walletId,
                dappId: dappId
            }
        }) != undefined
    }
}

export const walletDAppService = new WalletDAppService()