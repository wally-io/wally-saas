import {IsArray, IsString, IsUUID, ValidateNested} from "class-validator"
import {Type} from "class-transformer"
import {WalletDAppAuthorizationRequest} from "./dapp-authorization.request"

export default class ConnectDAppQueryRequest {
    @IsUUID()
    dappId: string

    @IsString()
    dappUserIdentifier: string
}