import {Router} from "express"
import Endpoint from "../enums/endpoint.enum"
import TransactionsController from "../controllers/transactions.controller"
import {validateUserToken, validateWalletToken} from "../middleware/auth.middleware"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import {
    CreateTransactionRequest, FindTransactionsRequest,
    SetTransactionFailRequest,
    SetTransactionStartRequest,
    SetTransactionSuccessRequest
} from "../dtos/transaction"

const router = Router()
const transactionsController = new TransactionsController()

// @ts-ignore
router.get(Endpoint.TRANSACTION_All, transactionsController.all)
// @ts-ignore
router.get(Endpoint.TRANSACTION_Find, validateWalletToken, validateQueryRequest(FindTransactionsRequest), transactionsController.find)
// @ts-ignore
router.post(Endpoint.TRANSACTION_Create, validateUserToken, validateRequest(CreateTransactionRequest), transactionsController.create)
// @ts-ignore
router.post(Endpoint.TRANSACTION_PublishStart, validateWalletToken, validateRequest(SetTransactionStartRequest), transactionsController.setStart)
// @ts-ignore
router.post(Endpoint.TRANSACTION_PublishSuccess, validateWalletToken, validateRequest(SetTransactionSuccessRequest), transactionsController.setSuccess)
// @ts-ignore
router.post(Endpoint.TRANSACTION_PublishFail, validateWalletToken, validateRequest(SetTransactionFailRequest), transactionsController.setFail)

export default router