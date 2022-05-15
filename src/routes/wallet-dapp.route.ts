import {Router} from "express"
import WalletDappController from "../controllers/wallet-dapp.controller"
import {validateRequest, validateQueryRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import {
    ConnectDAppRequest,
    FindAuthorizationsRequest,
    GetDAppConnectLinkRequest,
    UpdateAuthorizationsRequest
} from "../dtos/wallet/dapp"
import {validateUserToken, validateWalletToken} from "../middleware/auth.middleware"

const router = Router()
const walletDappController = new WalletDappController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.get(Endpoint.WALLET_DAPP_Find, validateWalletToken, walletDappController.findDApps)
// @ts-ignore
router.get(Endpoint.WALLET_DAPP_GetAuthorizations, validateWalletToken, validateQueryRequest(FindAuthorizationsRequest), walletDappController.getAuthorizations)
// @ts-ignore
router.post(Endpoint.WALLET_DAPP_UpdateAuthorizations, validateWalletToken, validateRequest(UpdateAuthorizationsRequest), walletDappController.updateAuthorizations)
// @ts-ignore
router.get(Endpoint.WALLET_DAPP_GetConnectLink, validateUserToken, validateQueryRequest(GetDAppConnectLinkRequest), walletDappController.getConnectLink)
// @ts-ignore
router.post(Endpoint.WALLET_DAPP_Connect, validateWalletToken, validateRequest(ConnectDAppRequest), walletDappController.connect)

export default router