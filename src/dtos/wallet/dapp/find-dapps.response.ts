export interface DAppsResponse {
    id: string,
    name: string
}

export default interface FindWalletDAppsResponse {
    dapps: DAppsResponse[]
}