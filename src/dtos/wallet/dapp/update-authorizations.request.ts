import {IsArray, IsUUID, ValidateNested} from "class-validator"
import {Type} from "class-transformer"
import {WalletDAppAuthorizationRequest} from "./dapp-authorization.request"

export default class UpdateAuthorizationsRequest {
    @IsUUID()
    dappId: string

    @IsArray()
    @ValidateNested({message: "Invalid authorization format"})
    @Type(() => WalletDAppAuthorizationRequest)
    public authorizations: WalletDAppAuthorizationRequest[]
}