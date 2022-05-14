import HttpException from "../interfaces/exception.interface"

export const isNull = (data): boolean => {
    return data === undefined || data === null
}

export const isNotNull = (data): boolean => {
    return !isNull(data)
}

export const isEmpty = (data): boolean => {
    return isNull(data) || data === '' || (Array.isArray(data) && data.length === 0)
}

export const isNotEmpty = (data): boolean => {
    return !isEmpty(data)
}

export const throwIfNull = (data, exception: HttpException) => {
    if (isNull(data)) {
        throw exception
    }
}

export const isString = (data) => {
    return typeof data === 'string' || data instanceof String
}


export const isNumber = (data) => {
    return typeof data === 'number' || data instanceof Number || Number.isFinite(data)
}