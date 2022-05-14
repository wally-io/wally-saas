import {Router} from "express"
import AuthRegisterController from "../controllers/auth-register.controller"
import {validateRequest} from "../middleware/validate-request.middleware"
import {RegisterRequest} from "../dtos/auth"
import Endpoint from "../enums/endpoint.enum"

const router = Router()
const authRegisterController = new AuthRegisterController()

// @ts-ignore
router.post(Endpoint.REGISTER, validateRequest(RegisterRequest), authRegisterController.register)

export default router