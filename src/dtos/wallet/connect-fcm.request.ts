import {IsString} from "class-validator"

export default class WalletConnectFcmRequest {
    @IsString()
    token: string
}