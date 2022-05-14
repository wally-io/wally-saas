import {IsString} from "class-validator"

export default class FindWalletsRequest {
    @IsString()
    dappIdentifier: string
}