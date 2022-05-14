import db from "../db/database"
import {TransactionModel} from "../models/transactions.model"
import {TransactionStatus} from "../enums"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"

class TransactionsService {
    private transactions = db.Transactions

    public async all(): Promise<TransactionModel[]> {
        return await this.transactions.findAll()
    }

    public async create(walletAddress: string, dappId: string): Promise<TransactionModel> {
        return await this.transactions.create({
            walletAddress: walletAddress,
            dappId: dappId,
            status: TransactionStatus.CREATED,
            result: null
        })
    }

    public async setAsStart(callerAddress: string, transactionId: string): Promise<TransactionModel> {
        const transaction = await this.getById(transactionId)
        if (transaction.walletAddress !== callerAddress) {
            throw Errors.NOT_OWNER()
        }
        await transaction.update({
            status: TransactionStatus.PUBLISH_START,
        })
        return transaction
    }

    public async setAsSuccess(callerAddress: string, transactionId: string, response: string): Promise<TransactionModel> {
        const transaction = await this.getById(transactionId)
        if (transaction.walletAddress !== callerAddress) {
            throw Errors.NOT_OWNER()
        }
        await transaction.update({
            status: TransactionStatus.SUCCESS,
            result: response
        })
        return transaction
    }

    public async setAsFail(callerAddress: string, transactionId: string, error: string): Promise<TransactionModel> {
        const transaction = await this.getById(transactionId)
        if (transaction.walletAddress !== callerAddress) {
            throw Errors.NOT_OWNER()
        }
        await transaction.update({
            status: TransactionStatus.FAILURE,
            result: error
        })
        return transaction
    }

    public async getById(transactionId: string): Promise<TransactionModel> {
        const transaction = await this.findById(transactionId)
        throwIfNull(transaction, Errors.NOT_FOUND_TransactionId(transactionId))
        return transaction!
    }

    public async findById(transactionId: string): Promise<TransactionModel | null> {
        return await this.transactions.findByPk(transactionId)
    }
}

export const transactionsService = new TransactionsService()