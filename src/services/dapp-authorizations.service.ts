import db from "../db/database"
import {DAppAuthorizationModel} from "../models/dapp-authorizations.model"
import {TransactionType} from "../enums/transaction-type.enum"
import {TargetType} from "../enums/token-type.enum"

class DAppAuthorizationsService {
    private dappAuthorizations = db.DAppAuthorizations

    public async getAll(): Promise<DAppAuthorizationModel[]> {
        return this.dappAuthorizations.findAll()
    }

    public async findAllByDAppId(dappId: string): Promise<DAppAuthorizationModel[]> {
        return await this.dappAuthorizations.findAll({
            where: {
                dappId: dappId
            }
        })
    }

    public async create(dappId: string, transactionType: TransactionType, targetType: TargetType, targetName: string, targetAddress: string, reason: string) {
        return await this.dappAuthorizations.create({
            dappId: dappId,
            transactionType: transactionType,
            targetType: targetType,
            targetName: targetName,
            targetAddress: targetAddress,
            reason: reason
        })
    }
}

export const dappAuthorizationsService = new DAppAuthorizationsService()