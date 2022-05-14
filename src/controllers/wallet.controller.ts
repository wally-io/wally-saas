import {BodyRequest, Empty, WalletBodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {ChallengeRequest, ChallengeResponse, WalletConnectFcmRequest, WalletLoginRequest} from "../dtos/wallet"
import {TokenResponse} from "../dtos/token"
import {tokenService} from "../services/token.service"
import {walletService} from "../services/wallet.service"
import {walletValidatorsService} from "../services/wallet-validators.service"
import EthSignature from "../utils/EthSignature"

export default class WalletRegisterController {
    public requestChallenge = async (req: BodyRequest<ChallengeRequest>, res: Response<ChallengeResponse>, next: NextFunction) => {
        try {
            const payload = req.body
            const validator = await walletValidatorsService.create(payload.address)
            res.status(200).json({
                address: validator.address,
                message: EthSignature.authMessage(validator.nonce)
            })
        } catch (error) {
            next(error)
        }
    }

    public connectFcm = async (req: WalletBodyRequest<WalletConnectFcmRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const wallet = req.wallet
            const payload = req.body
            await walletService.connectFcm(wallet.id, payload.token)
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: BodyRequest<WalletLoginRequest>, res: Response<TokenResponse>, next: NextFunction) => {
        try {
            const payload = req.body

            await walletValidatorsService.validate(payload.address, payload.signature)

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