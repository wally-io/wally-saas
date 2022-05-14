import {IsUUID} from "class-validator"

export default class GetDAppAuthorizationsRequest {
    @IsUUID()
    dappId: string
}