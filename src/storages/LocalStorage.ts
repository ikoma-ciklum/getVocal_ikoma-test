import {storageUtils} from "../utils";

enum ELocalStorageKey {
    TodoList = "todoList"
}

class LocalStorage extends Storage {
    static setItem<T>(key: ELocalStorageKey, value: T): void {
        localStorage.setItem(key, storageUtils.setStorageItem<T>(value))
    }

    static getItem(key: ELocalStorageKey): string | null {
        return storageUtils.getStorageItem(localStorage.getItem(key))
    }

    static removeItem(key: ELocalStorageKey): void {
        localStorage.removeItem(key)
    }

    static clear(): void {
        localStorage.clear()
    }
}

export {LocalStorage, ELocalStorageKey}