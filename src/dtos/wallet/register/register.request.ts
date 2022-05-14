import {IsEthereumAddress, IsString} from "class-validator"

export default class EthAuthorizeRequest {
    @IsEthereumAddress()
    address: string

    @IsString()
    signature: string
}