import {DAppAuthorization} from "../dtos/dapp/create-dapp.request"
import db from "../db/database"
import {DApp} from "../interfaces/dapps.interface"
import Errors from "../utils/Errors"
import {DAppModel} from "../models/dapps.model"
import {throwIfNull} from "../utils/checks"
import {dappAuthorizationsService} from "./dapp-authorizations.service"

class DAppService {
    private dapps = db.DApps

    public async getAll(): Promise<DAppModel[]> {
        return this.dapps.findAll()
    }

    public async create(ownerId: string, name: string, authorizations: DAppAuthorization[]): Promise<DApp> {
        if (await this.nameExists(name)) {
            throw Errors.CONFLICT("name", name)
        }

        const dapp = await this.dapps.create({
            name: name,
            ownerId: ownerId
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
}

export const dappService = new DAppService()