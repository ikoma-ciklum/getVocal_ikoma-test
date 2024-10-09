import { type FC, type ReactElement } from "react"
import {StorageService} from "../../services";
import {ELocalStorageKey} from "../../storages";

const storageService: StorageService = new StorageService()

const ToDoList: FC = (): ReactElement => {
    storageService.setItem(ELocalStorageKey.TodoList, 'todolist')
    return <>LIST</>
}

export { ToDoList }
