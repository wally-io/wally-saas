export default interface Wallet {
    id : string
    address: string
    fcmToken: string | null
    createdAt: Date
    updatedAt: Date
}