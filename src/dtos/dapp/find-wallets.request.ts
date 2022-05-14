import {IsString} from "class-validator"

export default class FindWalletsRequest {
    @IsString()
    dappId: string
}