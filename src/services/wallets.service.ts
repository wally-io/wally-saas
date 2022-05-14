import db from "../db/database"
import {WalletModel} from "../models/wallets.model"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"
import Wallet from "../interfaces/wallet.interface"
import {WalletDAppModel} from "../models/wallet-dapps.model"

class WalletService {
    private wallets = db.Wallets

    public async getAll(): Promise<WalletModel[]> {
        return await this.wallets.findAll()
    }

    public async getById(walletId: string): Promise<WalletModel> {
        const wallet = await this.findById(walletId)
        throwIfNull(wallet, Errors.NOT_FOUND_WalletId(walletId))
        return wallet!
    }

    public async getByAddress(address: string): Promise<WalletModel> {
        const wallet = await this.findByAddress(address)
        throwIfNull(wallet, Errors.NOT_FOUND_WalletAddress(address))
        return wallet!
    }

    public async findById(walletId: string): Promise<WalletModel | null> {
        return await this.wallets.findByPk(walletId)
    }

    public async findByAddress(address: string): Promise<WalletModel | null> {
        return await this.wallets.findOne({
            where: {address: address}
        })
    }

    public async findByIds(walletIds: string[]): Promise<WalletModel[]> {
        return await this.wallets.findAll({
            where: {id: walletIds}
        })
    }

    public async addressExists(address: string): Promise<boolean> {
        return await this.wallets.findOne({
            where: {address: address}
        }) != undefined
    }

    public async create(address: string): Promise<Wallet> {
        if (await this.addressExists(address)) {
            throw Errors.CONFLICT("address", address)
        }
        return await this.wallets.create({
            address: address
        })
    }
}

export const walletService = new WalletService()