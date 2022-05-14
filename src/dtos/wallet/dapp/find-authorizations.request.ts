import {IsString} from "class-validator"

export default class FindAuthorizationsRequest {
    @IsString()
    public dappId: string
}