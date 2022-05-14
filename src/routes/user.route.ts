import {Router} from "express"
import UserController from "../controllers/user.controller"
import {validateQueryRequest} from "../middleware/validate-request.middleware"
import {UserFindRequest} from "../dtos/user"
import Endpoint from "../enums/endpoint.enum"

const router = Router()
const userController = new UserController()

// @ts-ignore
router.get(Endpoint.USER_Find, validateQueryRequest(UserFindRequest), userController.find)
// @ts-ignore
router.get(Endpoint.USER_All, userController.all)

export default router