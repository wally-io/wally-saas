import {Router} from "express"
import {validateRequest} from "../middleware/validate-request.middleware"
import Endpoint from "../enums/endpoint.enum"
import DappAuthorizationsController from "../controllers/dapp-authorizations.controller"
import AddAuthorizationRequest from "../dtos/dapp/authorization/add.request"
import DeleteAuthorizationRequest from "../dtos/dapp/authorization/delete.request"
import {validateUserToken} from "../middleware/auth.middleware"
import {GetDAppAuthorizationsRequest} from "../dtos/dapp/authorization"

const router = Router()
const dappAuthorizationsController = new DappAuthorizationsController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.get(Endpoint.DAPP_AUTHORIZATIONS_Get, validateRequest(GetDAppAuthorizationsRequest), dappAuthorizationsController.getAuthorizations)
// @ts-ignore
router.post(Endpoint.DAPP_AUTHORIZATIONS_Add, validateUserToken, validateRequest(AddAuthorizationRequest), dappAuthorizationsController.add)
// @ts-ignore
router.post(Endpoint.DAPP_AUTHORIZATIONS_Delete, validateUserToken, validateRequest(DeleteAuthorizationRequest), dappAuthorizationsController.delete)

export default router