export default class EthSignature {

    public static authMessage(nonce: string): string {
        return `Welcome to Wally!
        Nonce: ${nonce}`
    }

    public static extractAddress(signature: string, nonce: string): string {
        const msgBufferHex = ethUtil.bufferToHex(Buffer.from(this.authMessage(nonce), 'utf8'))
        const resultAddress = sigUtil.recoverPersonalSignature({
            data: msgBufferHex,
            signature: signature
        })
        return resultAddress
    }
}