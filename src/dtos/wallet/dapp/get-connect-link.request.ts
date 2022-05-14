import {IsString} from "class-validator"

export default class GetDAppConnectLinkRequest {
    @IsString()
    public dappUserIdentifier: string
}