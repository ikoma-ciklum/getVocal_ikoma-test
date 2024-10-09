import {
    type Dispatch,
    type FC,
    type ReactElement,
   type  SetStateAction,
    startTransition,
    useCallback,
    useEffect,
    useState,
    useDeferredValue,
    useRef
} from "react"
import { StorageService } from "../../../services"
import { ELocalStorageKey } from "../../../storages"
import { ToDoListItem as ListItem } from "./index.ts"
import isEmpty from "lodash/isEmpty"
import classNames from "classnames"

const storageService: StorageService = new StorageService()

const List: FC = (): ReactElement => {
    const [todoList, setToDoList]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>(
        storageService.getItem(ELocalStorageKey.TodoList) || []
    )
    const deferredToDoList = useDeferredValue(todoList)

    const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const [errorMessage, setErrorMessage] = useState<string>(String())

    const inputTimeoutRef = useRef(null)

    const handleRemoveAllTodos = useCallback((): void => startTransition((): void => (storageService.clearStorage(), setToDoList([]))), [])

    const handleAddTodo = useCallback(() => {
        if (isEmpty(inputValue.trim())) {
            return
        }

        if (todoList?.includes(inputValue.trim())) {
            setErrorMessage("This todo has been already added")
            return;
        }

        startTransition(() =>
            setToDoList(prevTodos => (!isEmpty(prevTodos) ? [...prevTodos, inputValue.trim()] : [inputValue.trim()]))
        )

        setInputValue(String())
    }, [inputValue, todoList])

    const handleInputChange = useCallback(
        (event: UIEvent): void => {
            setInputValue(event.target.value)

            if (inputTimeoutRef.current) {
                clearTimeout(inputTimeoutRef.current)
            }

            inputTimeoutRef.current = setTimeout(() => {
                handleAddTodo()
            }, 2000)
        },
        [handleAddTodo]
    )

    useEffect((): void => (
        (!isEmpty(todoList) && storageService.setItem(ELocalStorageKey.TodoList, todoList), void 0)
    ), [todoList])

    return (
        <div className="flex flex-col max-w-md mx-auto mt-10">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add todo..."
                className="border-[1px] rounded-[10px] border-gray-300 p-3"
            />
            <p
                className={classNames({
                    hidden: isEmpty(errorMessage),
                    "text-sm text-red-400": !isEmpty(errorMessage)
                })}>
                {errorMessage}
            </p>
            <ul className="mt-4 mb-4">
                {deferredToDoList?.length > 0
                    ? deferredToDoList.map((todo: string) => <ListItem key={todo} text={todo} />)
                    : null}
            </ul>
            <button
                onClick={handleRemoveAllTodos}
                className={classNames("bg-red-500 text-white p-2 w-full", {
                    "pointer-events-none bg-red-400": isEmpty(todoList)
                })}>
                Purge list
            </button>
        </div>
    )
}

export { List as ToDoList }
