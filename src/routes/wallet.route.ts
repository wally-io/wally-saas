import {Router} from "express"
import WalletController from "../controllers/wallet.controller"
import {validateRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import ChallengeRequest from "../dtos/wallet/challenge.request"
import {LoginRequest} from "../dtos/wallet"

const router = Router()
const walletController = new WalletController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.post(Endpoint.WALLET_Login, validateRequest(LoginRequest), walletController.login)
// @ts-ignore
router.post(Endpoint.WALLET_ETH_Challenge, validateRequest(ChallengeRequest), walletController.requestChallenge)


export default router