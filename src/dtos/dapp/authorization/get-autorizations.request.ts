import {IsString} from "class-validator"

export default class GetDAppAuthorizationsRequest {
    @IsString()
    dappIdentifier: string
}