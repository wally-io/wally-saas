import db from "../db/database"
import {DAppAuthorizationModel} from "../models/dapp-authorizations.model"
import {TargetType, TransactionType} from "../enums"
import {UserModel} from "../models/users.model"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"

class DAppAuthorizationsService {
    private dappAuthorizations = db.DAppAuthorizations

    public async getAll(): Promise<DAppAuthorizationModel[]> {
        return this.dappAuthorizations.findAll()
    }

    public async getById(id: number): Promise<DAppAuthorizationModel> {
        const authorization = await this.findById(id)
        throwIfNull(authorization, Errors.NOT_FOUND_DAppAuthorizationId(id))
        return authorization!;
    }

    public async findById(id: number): Promise<DAppAuthorizationModel | null> {
        return await this.dappAuthorizations.findByPk(id);
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