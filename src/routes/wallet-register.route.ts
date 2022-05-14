import {Router} from "express"
import WalletRegisterController from "../controllers/wallet-register.controller"
import validateRequest from "../middleware/validate-request.middleware"
import {RegisterRequest} from "../dtos/wallet/register"
import Endpoint from "../enums/endpoint.enum"

const router = Router()
const walletRegisterController = new WalletRegisterController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.post(Endpoint.WALLET_ETH_Register, validateRequest(RegisterRequest), walletRegisterController.ethregister)


export default router