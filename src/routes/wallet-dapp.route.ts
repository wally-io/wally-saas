import {Router} from "express"
import WalletDappController from "../controllers/wallet-dapp.controller"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import {FindAuthorizationsRequest, UpdateAuthorizationsRequest} from "../dtos/wallet/dapp"
import {validateWalletToken} from "../middleware/auth.middleware"

const router = Router()
const walletDappController = new WalletDappController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.get(Endpoint.WALLET_DAPP_Find, validateWalletToken, walletDappController.find)
// @ts-ignore
router.post(Endpoint.WALLET_DAPP_GetAuthorizations, validateWalletToken, validateQueryRequest(FindAuthorizationsRequest), walletDappController.getAuthorizations)
// @ts-ignore
router.post(Endpoint.WALLET_DAPP_UpdateAuthorizations, validateWalletToken, validateRequest(UpdateAuthorizationsRequest), walletDappController.updateAuthorizations)


export default router