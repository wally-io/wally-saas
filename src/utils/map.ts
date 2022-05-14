import {isEmpty, isNull, isNumber, isString} from "./checks"

export function associateBy<T, K>(array: T[], key: string): { [key: string | number]: T } {
    if (isEmpty(array)) {
        return {}
    }
    if (isNull(array[0][key]) || !(isString(array[0][key]) || isNumber(array[0][key]))) {
        return {}
    }
    const result: { [key: string | number]: T } = {}
    array.forEach(item => {
        result[item[key]] = item
    })
    return result
}