import {Empty, EmptyRequest, UserBodyRequest, WalletBodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {
    AllTransactionsResponse,
    CreateTransactionRequest,
    CreateTransactionResponse, SetTransactionFailRequest,
    SetTransactionStartRequest, SetTransactionSuccessRequest
} from "../dtos/transaction"
import {transactionsService} from "../services/transactions.service"
import {dappService} from "../services/dapps.service"

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
    public create = async (req: UserBodyRequest<CreateTransactionRequest>, res: Response<CreateTransactionResponse>, next: NextFunction) => {
        try {
            const user = req.user
            const payload = req.body

            await dappService.validateOwnership(payload.dappId, user.id)

            const transaction = await transactionsService.create(payload.walletAddress, payload.dappId)

            // TODO create transaction

            // TODO push transaction to Firebase

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
            // TODO call dapp callback dapp.callback

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
            // TODO call dapp callback dapp.callback

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
            // TODO call dapp callback dapp.callback

            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}