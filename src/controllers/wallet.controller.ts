import {BodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {ChallengeRequest, ChallengeResponse, LoginRequest} from "../dtos/wallet"
import {TokenResponse} from "../dtos/token"
import Errors from "../utils/Errors"
import {tokenService} from "../services/token.service"
import {walletService} from "../services/wallets.service"
import {walletValidatorsService} from "../services/wallet-validators.service"

export default class WalletRegisterController {
    public requestChallenge = async (req: BodyRequest<ChallengeRequest>, res: Response<ChallengeResponse>, next: NextFunction) => {
        try {
            const payload = req.body
            throw Errors.NOT_IMPLEMENTED()
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: BodyRequest<LoginRequest>, res: Response<TokenResponse>, next: NextFunction) => {
        try {
            const payload = req.body

            if (!await walletValidatorsService.validate(payload.address, payload.signature)) {
                throw Errors.REJECTED_Signature()
            }

            const wallet = await walletService.getByAddress(payload.address)

            const newToken = await tokenService.newWalletToken(wallet.address)
            res.status(200).json({
                token: newToken.token,
                expireAt: new Date(Date.now() + newToken.expiresIn)
            })
        } catch (error) {
            next(error)
        }
    }
}