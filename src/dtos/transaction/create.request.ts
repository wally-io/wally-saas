import {IsArray, IsEthereumAddress, IsString, IsUUID} from "class-validator"

export default class CreateTransactionRequest {
    @IsUUID()
    public dappId: string
    @IsEthereumAddress()
    public walletAddress: string
    @IsEthereumAddress()
    public contractAddress: string
    @IsString()
    public method: string
    @IsArray()
    public parameters: any[]
}