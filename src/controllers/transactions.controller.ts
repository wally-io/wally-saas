import {Empty, EmptyRequest, UserBodyRequest, WalletBodyRequest, WalletQueryRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    AllTransactionsResponse,
    CreateTransactionRequest,
    CreateTransactionResponse, FindTransactionsRequest, SetTransactionFailRequest,
    SetTransactionStartRequest, SetTransactionSuccessRequest
} from "../dtos/transaction"
import {transactionsService} from "../services/transaction.service"
import {dappService} from "../services/dapp.service"
import {publish} from "../utils/transaction.publisher"
import {walletService} from "../services/wallet.service"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"
import {Contract} from "ethers"
// for test only
import ERC20 from "erc-20-abi"
// end

export default class TransactionsController {
    public all = async (req: EmptyRequest, res: Response<AllTransactionsResponse>, next: NextFunction) => {
        try {
            const result = await transactionsService.all()
            res.status(200).json({
                transactions: result
            })
        } catch (error) {
            next(error)
        }
    }
    public find = async (req: WalletQueryRequest<FindTransactionsRequest>, res: Response<AllTransactionsResponse>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.query
            const result = await transactionsService.find(wallet.address,payload.status)
            res.status(200).json({
                transactions: result
            })
        } catch (error) {
            next(error)
        }
    }
    public create = async (req: UserBodyRequest<CreateTransactionRequest>, res: Response<CreateTransactionResponse>, next: NextFunction) => {
        try {
            const user = req.user
            const payload = req.body

            await dappService.validateOwnership(payload.dappId, user.id)

            const dapp = await dappService.getById(payload.dappId)
            // TODO call dapp callback dapp.callback to notify new transaction

            const wallet = await walletService.getByAddress(payload.walletAddress)

            // TODO check dapp allowance for that wallet (or authorizations)

            // TODO add apis to manage abis, client can only create transactions from subscribed abis
            const contract = new Contract(payload.contractAddress, ERC20);
            const rawTransaction = await contract.populateTransaction[payload.method](...payload.parameters);

            throwIfNull(wallet.fcmToken, Errors.WALLET_Disconnected(wallet.address))

            const transactionBody = JSON.stringify(rawTransaction)

            const transaction = await transactionsService.create(payload.walletAddress, payload.dappId, transactionBody)

            publish(wallet.fcmToken!, transaction.id, transactionBody)

            res.status(200).json({
                transactionId: transaction.id
            })
        } catch (error) {
            next(error)
        }
    }
    public setStart = async (req: WalletBodyRequest<SetTransactionStartRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            const transaction = await transactionsService.setAsStart(wallet.address, payload.transactionId)

            const dapp = await dappService.getById(transaction.dappId)
            // TODO call dapp callback dapp.callback to notify transaction is signed

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
    public setSuccess = async (req: WalletBodyRequest<SetTransactionSuccessRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            const transaction = await transactionsService.setAsSuccess(wallet.address, payload.transactionId, payload.response)

            const dapp = await dappService.getById(transaction.dappId)
            // TODO call dapp callback dapp.callback to notify transaction is persisted on blockchain

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
    public setFail = async (req: WalletBodyRequest<SetTransactionFailRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            const transaction = await transactionsService.setAsFail(wallet.address, payload.transactionId, payload.error)

            const dapp = await dappService.getById(transaction.dappId)
            // TODO call dapp callback dapp.callback to notify transaction failed

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}