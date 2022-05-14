import {IsString} from "class-validator"

export default class GetDAppAuthorizationsRequest {
    @IsString()
    dappId: string
}