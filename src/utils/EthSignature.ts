import {ethers} from "ethers"

export default class EthSignature {

    public static authMessage(nonce: string): string {
        return `Welcome to Wally!
        Nonce: ${nonce}`
    }

    public static extractAddress(signature: string, nonce: string): string {
        const message = this.authMessage(nonce)
        return ethers.utils.verifyMessage(message, signature)
    }
}