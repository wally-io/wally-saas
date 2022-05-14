import {IsEthereumAddress} from "class-validator"

export default class ChallengeRequest {
    @IsEthereumAddress()
    address: string
}