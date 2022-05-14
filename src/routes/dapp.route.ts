import {Router} from "express"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import {FindWalletsRequest} from "../dtos/dapp"
import DappController from "../controllers/dapp.controller"

const router = Router()
const dappController = new DappController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.post(Endpoint.DAPP_FindWallets, validateQueryRequest(FindWalletsRequest), dappController.findWallets)

export default router