import {
    type Dispatch,
    type FC,
    type ReactElement,
    type SetStateAction,
    startTransition,
    useCallback,
    useDeferredValue,
    useEffect,
    useState
} from "react"
import { ToDoList as List } from "./components/ToDoList.tsx"
import { ToDoListFilter as Filter } from "./components"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"
import { EToDoListItemStatus, ITodoListItem } from "./types.ts"
import { ELocalStorageKey } from "../../storages"
import { StorageService } from "../../services"

const storageService: StorageService = new StorageService()

const Widget: FC = (): ReactElement => {
    const [todoList, setToDoList]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>(
        storageService.getItem(ELocalStorageKey.TodoList) || []
    )
    const deferredToDoList = useDeferredValue(todoList)

    const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const [errorMessage, setErrorMessage] = useState<string>(String())

    const handleRemoveAllTodos = useCallback(
        (): void => startTransition((): void => (storageService.clearStorage(), setToDoList([]))),
        []
    )

    const handleAddTodo = useCallback(() => {
        if (isEmpty(inputValue)) {
            return
        }

        if (!!todoList?.find((t: ITodoListItem) => t.text === inputValue)) {
            setErrorMessage("This todo has been already added")
            return
        }

        const newTodo: ITodoListItem = { status: EToDoListItemStatus.New, text: inputValue }

        startTransition(
            () => (
                setToDoList(prevTodos => (!isEmpty(prevTodos) ? [...prevTodos, newTodo] : [newTodo])),
                setInputValue(String())
            )
        )
    }, [todoList, inputValue])

    const handleInputChange = useCallback((event: UIEvent): void => {
        setErrorMessage(String())
        setInputValue(event.target.value)
    }, [])

    const updateTodoStatus = useCallback((index, newStatus) => {
        setToDoList(prev =>
            prev.map((todo, todoIndex) => (todoIndex === index ? { ...todo, status: newStatus } : todo))
        )
    }, [])

    const handleListItemStatusChange = useCallback(
        (event: UIEvent) => {
            const { dataset } = event.target
            const { index, status } = dataset

            if (index !== undefined && status) {
                updateTodoStatus(Number(index), status)
            }
        },
        [updateTodoStatus]
    )

    useEffect(
        (): void => (!isEmpty(todoList) && storageService.setItem(ELocalStorageKey.TodoList, todoList), void 0),
        [todoList]
    )

    return (
        <div className="flex flex-col max-w-md mx-auto mt-10">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleAddTodo}
                placeholder="New todo..."
                className="border-[1px] rounded-[10px] border-gray-300 p-3"
            />
            <p
                className={classNames({
                    hidden: isEmpty(errorMessage),
                    "text-sm text-red-400": !isEmpty(errorMessage)
                })}>
                {errorMessage}
            </p>
            <List itemList={deferredToDoList} handleClick={handleListItemStatusChange} />
            <button
                onClick={handleRemoveAllTodos}
                className={classNames("bg-red-500 text-white p-2 w-full", {
                    "pointer-events-none bg-red-400": isEmpty(todoList)
                })}>
                Purge list
            </button>

            <Filter />
        </div>
    )
}

export { Widget as ToDoWidget }
