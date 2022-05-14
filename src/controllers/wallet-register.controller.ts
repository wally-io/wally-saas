import {BodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import {RegisterRequest} from "../dtos/wallet/register"
import {walletValidatorsService} from "../services/wallet-validators.service"
import {walletService} from "../services/wallets.service"
import {tokenService} from "../services/token.service"
import {TokenResponse} from "../dtos/token"

export default class WalletRegisterController {

    public register = async (req: BodyRequest<RegisterRequest>, res: Response<TokenResponse>, next: NextFunction) => {
        try {
            const payload = req.body
            await walletValidatorsService.validate(payload.address, payload.signature)

            const wallet = await walletService.create(payload.address)

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