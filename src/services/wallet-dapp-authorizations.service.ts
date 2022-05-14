import db from "../db/database"
import {WalletDAppAuthorizationModel} from "../models/wallet-dapp-authorizations.model"

class WalletDAppAuthorizationsService {
    private walletDAppAuthorizations = db.WalletDAppAuthorizations

    public async create(walletId: number, dappId: number, dappAuthorizationId: number, authorized: boolean): Promise<WalletDAppAuthorizationModel> {
        return await this.walletDAppAuthorizations.create({
            walletId: walletId,
            dappId: dappId,
            dappAuthorizationId: dappAuthorizationId,
            authorized: authorized
        })
    }
}

export const walletDAppAuthorizationsService = new WalletDAppAuthorizationsService()