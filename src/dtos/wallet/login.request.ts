import {IsEthereumAddress, IsString} from "class-validator"

export default class LoginRequest {
    @IsEthereumAddress()
    address: string

    @IsString()
    signature: string
}