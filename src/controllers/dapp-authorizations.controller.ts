import {Empty, QueryRequest, UserBodyRequest} from "../interfaces/api.interface"
import {NextFunction, Response} from "express"
import Errors from "../utils/Errors"
import {
    AddAuthorizationRequest, DeleteAuthorizationRequest,
    GetDAppAuthorizationsRequest,
    GetDAppAuthorizationsResponse
} from "../dtos/dapp/authorization"
import {dappAuthorizationsService} from "../services/dapp-authorizations.service"

export default class DappAuthorizationsController {
    public getAuthorizations = async (req: QueryRequest<GetDAppAuthorizationsRequest>, res: Response<GetDAppAuthorizationsResponse>, next: NextFunction) => {
        try {
            const payload = req.query
            const authorizations = await dappAuthorizationsService.findAllByDAppId(payload.dappId)
            res.status(200).json({
                authorizations: authorizations
            })
        } catch (error) {
            next(error)
        }
    }

    public add = async (req: UserBodyRequest<AddAuthorizationRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const payload = req.body
            throw Errors.NOT_IMPLEMENTED()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: UserBodyRequest<DeleteAuthorizationRequest>, res: Response<Empty>, next: NextFunction) => {
        try {
            const payload = req.body
            throw Errors.NOT_IMPLEMENTED()
            res.status(200).json({})
        } catch (error) {
            next(error)
        }
    }
}