import {IsString} from "class-validator"

export default class FindAuthorizationsRequest {
    @IsString()
    public dappIdentifier: string
}