export default class EthSignature {

    public async authMessage(publicKey: string, network: "sol" | "eth", nonce: number | string) {
        return `Welcome to Wally!

  Click "Sign" to sign in. No password needed!
  This request will not trigger a blockchain transaction or cost any gas fees.
  
  Your authentication status will be reset after 24 hours.
  
  Wallet ${network}_address:
  ${publicKey}
  
  Nonce:
  ${nonce}`
    }

    public async bindMessage(address: string, email: string, nonce: number | string) {
        return `Welcome to Wally!

  Click "Sign" to bind your eth_address(${address}) to your Delysium account of ${email}.

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  Email: ${email}
  
  Nonce:
  ${nonce}`
    }
}