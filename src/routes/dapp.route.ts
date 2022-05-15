import {Router} from "express"
import {validateQueryRequest, validateRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import {FindWalletsRequest, CreateDappRequest, AllDAppResponse} from "../dtos/dapp"
import DappController from "../controllers/dapp.controller"
import {validateUserToken} from "../middleware/auth.middleware"

const router = Router()
const dappController = new DappController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.get(Endpoint.DAPP_All, dappController.all)
// @ts-ignore
router.post(Endpoint.DAPP_Create, validateUserToken, validateRequest(CreateDappRequest), dappController.create)
// @ts-ignore
router.get(Endpoint.DAPP_FindWallets, validateQueryRequest(FindWalletsRequest), dappController.findWallets)


export default router