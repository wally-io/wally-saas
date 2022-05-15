import {IsArray, IsString, IsUUID, ValidateNested} from "class-validator"
import {Type} from "class-transformer"
import {WalletDAppAuthorizationRequest} from "./dapp-authorization.request"

export default class ConnectDAppRequest {
    @IsArray()
    @ValidateNested({message: "Invalid authorization format"})
    @Type(() => WalletDAppAuthorizationRequest)
    public authorizations: WalletDAppAuthorizationRequest[]
}