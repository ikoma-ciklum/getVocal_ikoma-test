import isString from 'lodash/isString'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

function getStorageItem(value: string | null): string | null {
    if (isString(value)) return value

    if (isNull(value) || isUndefined(value)) return null

    return value
}

function setStorageItem<T>(value: T): string {
    return isString(value) ? value : JSON.stringify(value)
}

const utils = { getStorageItem, setStorageItem }

export { utils as  storageUtils }
