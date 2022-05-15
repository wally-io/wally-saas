import {IsString, IsUUID} from "class-validator"

export default class GetDAppConnectLinkRequest {
    @IsString()
    public dappUserIdentifier: string
    @IsUUID()
    public dappId: string
}