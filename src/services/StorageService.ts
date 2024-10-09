import { LocalStorage, ELocalStorageKey } from "../storages"

type TStorage = Omit<Storage, "key">

type EStorageKey = ELocalStorageKey

enum EStorageServiceType {
    Local
}

const storageMap: { [K in EStorageServiceType]: TStorage } = {
    [EStorageServiceType.Local]: LocalStorage
}

class StorageService {
    private storage: TStorage

    constructor(storageType: EStorageServiceType = EStorageServiceType.Local) {
        this.storage = storageMap[storageType]
    }

    public setItem<T>(key: EStorageKey, value: T): void {
        this.storage.setItem(key, value)
    }

    public getItem<T>(key: EStorageKey): T {
        return this.storage.getItem(key)
    }

    public removeItem(key: EStorageKey): void {
        this.storage.removeItem(key)
    }

    public clearStorage(): void {
        this.storage.clear()
    }
}

export { StorageService, EStorageServiceType }
