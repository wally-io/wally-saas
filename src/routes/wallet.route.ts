import {Router} from "express"
import WalletController from "../controllers/wallet.controller"
import {validateRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import ChallengeRequest from "../dtos/wallet/challenge.request"
import {WalletConnectFcmRequest, WalletLoginRequest} from "../dtos/wallet"
import {validateWalletToken} from "../middleware/auth.middleware"

const router = Router()
const walletController = new WalletController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.post(Endpoint.WALLET_Login, validateRequest(WalletLoginRequest), walletController.login)
// @ts-ignore
router.post(Endpoint.WALLET_ConnectFcm, validateWalletToken, validateRequest(WalletConnectFcmRequest), walletController.connectFcm)
// @ts-ignore
router.post(Endpoint.WALLET_ETH_Challenge, validateRequest(ChallengeRequest), walletController.requestChallenge)


export default router