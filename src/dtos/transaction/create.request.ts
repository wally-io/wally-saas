import {IsArray, IsEthereumAddress, IsUUID} from "class-validator"

export default class CreateTransactionRequest {
    @IsUUID()
    public dappId: string
    @IsEthereumAddress()
    public walletAddress: string
    @IsEthereumAddress()
    public contractAddress: string
    @IsArray()
    public parameters: any[]
}