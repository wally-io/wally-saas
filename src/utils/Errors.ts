import HttpException from "../interfaces/exception.interface"
import ErrorCode from "../enums/error-code.enum"

const Errors = {
    NOT_FOUND_User: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_User, `${reason}`),
    NOT_FOUND_UserId: (userId: number) => new HttpException(ErrorCode.NOT_FOUND_UserId, `User not found for id[${userId}].`),
    NOT_FOUND_UserEmail: (userEmail: string) => new HttpException(ErrorCode.NOT_FOUND_UserEmail, `User not found for email[${userEmail}].`),
    NOT_FOUND_Wallet: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Wallet, `${reason}`),
    NOT_FOUND_WalletId: (userId: number) => new HttpException(ErrorCode.NOT_FOUND_WalletId, `Wallet not found for id[${userId}].`),
    NOT_FOUND_WalletIdentifier: (identifier: string) => new HttpException(ErrorCode.NOT_FOUND_WalletIdentifier, `Wallet not found for identifier[${identifier}].`),
    NOT_FOUND_WalletAddress: (address: string) => new HttpException(ErrorCode.NOT_FOUND_WalletAddress, `Wallet not found for address[${address}].`),
    CONFLICT_Email: (email: string) => new HttpException(ErrorCode.CONFLICT_Email, `The email[${email}] is not available.`),
    REJECTED_Password: () => new HttpException(ErrorCode.REJECTED_Password, `Incorrect Password.`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    REQUIRE_Access: () => new HttpException(ErrorCode.REQUIRE_Access, `User has been suspended.`),
    INVALID_Token: () => new HttpException(ErrorCode.INVALID_Token, `Authentication token is invalid.`),
    INVALID_Parameter: (reason: string) => new HttpException(ErrorCode.INVALID_Parameter, `${reason}`),
    MISSING_Filter: () =>  new HttpException(ErrorCode.MISSING_Filter, `Request filter not specified.`),
    NOT_IMPLEMENTED: () =>  new HttpException(ErrorCode.NOT_IMPLEMENTED, `API not implemented.`),
}

export default Errors