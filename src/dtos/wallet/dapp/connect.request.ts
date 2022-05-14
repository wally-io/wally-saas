import {IsArray, IsBoolean, IsNumber, IsString, ValidateNested} from "class-validator"
import {Type} from "class-transformer"

export class DAppAuthorization {
    @IsNumber()
    dappAuthorizationId: number
    @IsBoolean()
    authorized: boolean
}

export default class ConnectDAppRequest {
    @IsString()
    dappIdentifier: string

    @IsArray()
    @ValidateNested({message: "Invalid authorization format"})
    @Type(() => DAppAuthorization)
    public authorizations: DAppAuthorization[]
}