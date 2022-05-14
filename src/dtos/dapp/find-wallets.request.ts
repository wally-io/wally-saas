import {IsUUID} from "class-validator"

export default class FindWalletsRequest {
    @IsUUID()
    dappId: string
}