import db from "../db/database"
import {WalletModel} from "../models/wallets.model"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"

class WalletService {
    public wallets = db.Wallets;

    public async getAll(): Promise<WalletModel[]> {
        return await this.wallets.findAll();
    }

    public async getById(walletId: number): Promise<WalletModel> {
        const findWallet = await this.wallets.findByPk(walletId);
        throwIfNull(findWallet, Errors.NOT_FOUND_WalletId(walletId))
        return findWallet!;
    }

    public async getByAddress(address: string): Promise<WalletModel> {
        const findWallet = await this.findByAddress(address)
        throwIfNull(findWallet, Errors.NOT_FOUND_WalletAddress(address))
        return findWallet!;
    }
    
    public async getByIdentifier(identifier: string): Promise<WalletModel> {
        const findWallet = await this.findByIdentifier(identifier)
        throwIfNull(findWallet, Errors.NOT_FOUND_WalletAddress(identifier))
        return findWallet!;
    }


    public async findById(id: number): Promise<WalletModel | null> {
        return await db.Wallets.findOne({
            where: {id: id}
        });
    }

    public async findByAddress(address: string): Promise<WalletModel | null> {
        return await db.Wallets.findOne({
            where: {address: address}
        });
    }
    
    public async findByIdentifier(identifier: string): Promise<WalletModel | null> {
        return await db.Wallets.findOne({
            where: {identifier: identifier}
        });
    }
}

export const walletService = new WalletService()