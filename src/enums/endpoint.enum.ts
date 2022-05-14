enum Endpoint {
    LOGIN = "/auth/login",
    LOGOUT = "/auth/logout",
    REGISTER = "/auth/register",
    ME = "/auth/me",
    USER_Find = "/user/find",
    USER_All = "/user/all",
    WALLET_Login = "/wallet/login",
    WALLET_ETH_Challenge = "/wallet/eth/challenge",
    WALLET_ETH_Register = "/wallet/eth/register",
    DAPP_All = "/dapp/all",
    DAPP_Create = "/dapp/create",
    DAPP_FindWallets = "/dapp/find-wallets",
    DAPP_AUTHORIZATIONS_Get = "/dapp/authorizations/get",
    DAPP_AUTHORIZATIONS_Add = "/dapp/authorizations/add",
    DAPP_AUTHORIZATIONS_Delete = "/dapp/authorizations/delete",
    WALLET_DAPP_Find = "/wallet/dapp/find",
    WALLET_DAPP_GetAuthorizations = "/wallet/dapp/get-authorizations",
    WALLET_DAPP_UpdateAuthorizations = "/wallet/dapp/update-authorizations",
}

export default Endpoint