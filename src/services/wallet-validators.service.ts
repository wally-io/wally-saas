import db from "../db/database"
import {WalletValidatorModel} from "../models/wallet-validators.model"
import {isNotNull, throwIfNull} from "../utils/checks"
import {nanoid} from "nanoid"
import Errors from "../utils/Errors"
import EthSignature from "../utils/EthSignature"

class WalletValidatorsService {
    private walletValidators = db.WalletValidators

    public async create(address: string): Promise<WalletValidatorModel> {
        const validator = await this.findByAddress(address)
        if (isNotNull(validator)) {
            await validator!.update({
                nonce: nanoid()
            })
            return validator!
        } else {
            return await this.walletValidators.create({
                address: address
            })
        }
    }

    public async validate(address: string, signature: string) {
        const validator = await this.getByAddress(address)
        const extractedAddress: string = EthSignature.extractAddress(signature, validator.nonce)
        if (address !== extractedAddress) {
            throw Errors.REJECTED_Signature()
        }
    }

    public async getByAddress(address: string): Promise<WalletValidatorModel> {
        const validator = await this.findByAddress(address)
        throwIfNull(validator, Errors.NOT_FOUND_WalletValidator(address))
        return validator!;
    }

    public async findByAddress(address: string): Promise<WalletValidatorModel | null> {
        return await this.walletValidators.findOne({
            where: {address: address}
        })
    }
}

export const walletValidatorsService = new WalletValidatorsService()