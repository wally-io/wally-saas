import { Router } from "express"
import {validateUserToken} from "../middleware/auth.middleware"
import AuthController from "../controllers/auth.controller"
import validateRequest from "../middleware/validate-request.middleware"
import {LoginRequest} from "../dtos/auth"
import Endpoint from "../enums/endpoint.enum"

const router = Router()
const authController = new AuthController()

// TODO find a way to let TypeScript understand
// @ts-ignore
router.post(Endpoint.LOGIN, validateRequest(LoginRequest), authController.login)
// @ts-ignore
router.post(Endpoint.LOGOUT, validateUserToken, authController.logout)
// @ts-ignore
router.get(Endpoint.ME, validateUserToken, authController.getMe)

export default router
