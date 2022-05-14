import {DAppAuthorization} from "../dtos/dapp/create-dapp.request"
import db from "../db/database"
import {DApp} from "../interfaces/dapp.interface"
import Errors from "../utils/Errors"
import {DAppModel} from "../models/dapps.model"
import {isEmpty, throwIfNull} from "../utils/checks"
import {dappAuthorizationsService} from "./dapp-authorizations.service"
import {WalletModel} from "../models/wallets.model"

class DAppService {
    private dapps = db.DApps

    public async getAll(): Promise<DAppModel[]> {
        return this.dapps.findAll()
    }

    public async create(ownerId: string, name: string, callback: string | null, authorizations: DAppAuthorization[]): Promise<DApp> {
        if (await this.nameExists(name)) {
            throw Errors.CONFLICT("name", name)
        }

        const dapp = await this.dapps.create({
            name: name,
            ownerId: ownerId,
            callback: isEmpty(callback) ? null : callback
        })

        for (const authorization of authorizations) {
            await dappAuthorizationsService.create(
                dapp.id,
                authorization.transactionType,
                authorization.targetType,
                authorization.targetName,
                authorization.targetAddress,
                authorization.reason
            )
        }

        return dapp
    }

    public async nameExists(name: string): Promise<boolean> {
        return await this.dapps.findOne({
            where: {name: name}
        }) != undefined
    }

    public async getById(dappId: string): Promise<DAppModel> {
        const dapp = await this.findById(dappId)
        throwIfNull(dapp, Errors.NOT_FOUND_DAppId(dappId))
        return dapp!
    }

    public async findById(dappId: string): Promise<DAppModel | null> {
        return await this.dapps.findByPk(dappId)
    }

    public async getByOwner(userId: string): Promise<DAppModel> {
        const dapp = await this.findByOwner(userId)
        throwIfNull(dapp, Errors.NOT_FOUND_DAppId(userId))
        return dapp!
    }

    public async findByOwner(userId: string): Promise<DAppModel | null> {
        return await this.dapps.findOne({
            where: {
                ownerId: userId
            }
        })
    }

    public async findByIds(dappIds: string[]): Promise<DAppModel[]> {
        return await this.dapps.findAll({
            where: {id: dappIds}
        })
    }

    public async validateOwnership(dappId: string, callerId: string) {
        const dapp = await dappService.getById(dappId)
        if (dapp.ownerId !== callerId) {
            throw Errors.NOT_OWNER()
        }
    }
}

export const dappService = new DAppService()