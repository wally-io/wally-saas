import {IsBoolean, IsNumber} from "class-validator"

export class WalletDAppAuthorizationRequest {
    @IsNumber()
    walletDAppAuthorizationId: number
    @IsBoolean()
    authorized: boolean
}