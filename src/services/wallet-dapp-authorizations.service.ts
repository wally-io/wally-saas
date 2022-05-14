import db from "../db/database"
import {WalletDAppAuthorizationModel} from "../models/wallet-dapp-authorizations.model"
import {DAppAuthorizationModel} from "../models/dapp-authorizations.model"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"

class WalletDAppAuthorizationsService {
    private walletDAppAuthorizations = db.WalletDAppAuthorizations

    public async findAll(walletId: string, dappId: string): Promise<WalletDAppAuthorizationModel[]> {
        return await this.walletDAppAuthorizations.findAll({
            where: {
                walletId: walletId,
                dappId: dappId
            }
        })
    }

    public async getById(id: number): Promise<WalletDAppAuthorizationModel> {
        const authorization = await this.findById(id)
        throwIfNull(authorization, Errors.NOT_FOUND_DAppAuthorizationId(id))
        return authorization!;
    }

    public async findById(id: number): Promise<WalletDAppAuthorizationModel | null> {
        return await this.walletDAppAuthorizations.findByPk(id);
    }

    public async create(walletId: string, dappId: string, dappAuthorizationId: number, authorized: boolean): Promise<WalletDAppAuthorizationModel> {
        return await this.walletDAppAuthorizations.create({
            walletId: walletId,
            dappId: dappId,
            dappAuthorizationId: dappAuthorizationId,
            authorized: authorized
        })
    }
}

export const walletDAppAuthorizationsService = new WalletDAppAuthorizationsService()