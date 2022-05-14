import {IsUUID} from "class-validator"

export default class FindAuthorizationsRequest {
    @IsUUID()
    public dappId: string
}