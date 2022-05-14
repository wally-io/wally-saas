import HttpException from "../interfaces/exception.interface"
import ErrorCode from "../enums/error-code.enum"

const Errors = {
    NOT_FOUND_User: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_User, `${reason}`),
    NOT_FOUND_UserId: (id: string) => new HttpException(ErrorCode.NOT_FOUND_UserId, `User not found for id[${id}].`),
    NOT_FOUND_UserEmail: (email: string) => new HttpException(ErrorCode.NOT_FOUND_UserEmail, `User not found for email[${email}].`),
    NOT_FOUND_WalletValidator: (address: string) => new HttpException(ErrorCode.NOT_FOUND_WalletValidator, `No validator found for wallet address[${address}]`),
    NOT_FOUND_Wallet: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Wallet, `${reason}`),
    NOT_FOUND_WalletId: (id: string) => new HttpException(ErrorCode.NOT_FOUND_WalletId, `Wallet not found for id[${id}].`),
    NOT_FOUND_WalletAddress: (address: string) => new HttpException(ErrorCode.NOT_FOUND_WalletAddress, `Wallet not found for address[${address}].`),
    NOT_FOUND_DAppId: (id: string) => new HttpException(ErrorCode.NOT_FOUND_DAppId, `DApp not found for id[${id}].`),
    NOT_FOUND_TransactionId: (id: string) => new HttpException(ErrorCode.NOT_FOUND_TransactionId, `Transaction not found for id[${id}].`),
    NOT_FOUND_DAppAuthorizationId: (id: number) => new HttpException(ErrorCode.NOT_FOUND_DAppAuthorizationId, `DAppAuthorization not found for id[${id}].`),
    CONFLICT: (parameter: string, data: string | number) => new HttpException(ErrorCode.CONFLICT, `The ${parameter}[${data}] is not available.`),
    CONFLICT_Email: (email: string) => new HttpException(ErrorCode.CONFLICT_Email, `The email[${email}] is not available.`),
    REJECTED_Password: () => new HttpException(ErrorCode.REJECTED_Password, `Incorrect Password.`),
    REJECTED_Signature: () => new HttpException(ErrorCode.REJECTED_Signature, `Incorrect Wallet Signature.`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    INVALID_Token: () => new HttpException(ErrorCode.INVALID_Token, `Authentication token is invalid.`),
    INVALID_Parameter: (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`),
    MISSING_Filter: () => new HttpException(ErrorCode.MISSING_Filter, `Request filter not specified.`),
    NOT_IMPLEMENTED: () => new HttpException(ErrorCode.NOT_IMPLEMENTED, `API not implemented.`),
    NOT_OWNER: () => new HttpException(ErrorCode.NOT_OWNER, `Not Owner of the resource you try to access.`),
    WALLET_Disconnected: (address: string) => new HttpException(ErrorCode.WALLET_Disconnected, `The wallet ${address} is not connected to Wally.`),
}

export default Errors