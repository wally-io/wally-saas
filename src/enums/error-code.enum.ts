enum ErrorCode {
    NOT_IMPLEMENTED = 404000,
    NOT_FOUND_User = 404100,
    NOT_FOUND_UserId = 404101,
    NOT_FOUND_UserEmail = 404102,
    NOT_FOUND_Wallet = 404103,
    NOT_FOUND_WalletId = 404104,
    NOT_FOUND_WalletAddress = 404106,
    NOT_FOUND_WalletValidator = 404107,
    NOT_FOUND_DAppId = 404108,
    CONFLICT = 409200,
    CONFLICT_Email = 409201,
    REJECTED_Password = 400300,
    REJECTED_Signature = 400301,
    REQUIRE_Token = 400401,
    REQUIRE_Access = 403404,
    INVALID_Token = 400502,
    INVALID_Parameter = 400503,
    MISSING_Filter = 404702,
}

export default ErrorCode