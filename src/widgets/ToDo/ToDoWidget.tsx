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
import isEmpty from "lodash/isEmpty"
import { ToDoList as List } from "./components/ToDoList.tsx"
import { ToDoListFilter as Filter } from "./components"
import { EToDoListItemStatus, ITodoListItem } from "./types.ts"
import { ELocalStorageKey } from "../../storages"
import { StorageService } from "../../services"
import {Button, Input, Message, Title} from "../../components"

const storageService: StorageService = new StorageService()

const Widget: FC = (): ReactElement => {
    const [todoList, setToDoList]: [ITodoListItem[], Dispatch<SetStateAction<ITodoListItem[]>>] = useState<
        ITodoListItem[]
    >(storageService.getItem(ELocalStorageKey.TodoList) || [])

    const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const [selectedFilters, setSelectedFilters]: [
        [EToDoListItemStatus],
        Dispatch<SetStateAction<[EToDoListItemStatus]>>
    ] = useState((storageService.getItem(ELocalStorageKey.TodoList) || [])?.map(({status}) => status))

    const deferredList: ITodoListItem[] = useDeferredValue(todoList)

    const filteredList: ITodoListItem[] = useDeferredValue(
        !isEmpty(selectedFilters) ? deferredList?.filter((t: ITodoListItem) => selectedFilters.includes(t.status)) : deferredList
    )

    useEffect(
        (): void => (!isEmpty(todoList) && storageService.setItem(ELocalStorageKey.TodoList, todoList), void 0),
        [todoList]
    )

    const handleRemoveAllTodos = useCallback(
        (): void => startTransition((): void => (storageService.clearStorage(), setToDoList([]))),
        []
    )

    const handleAddTodo = useCallback((): void => {
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

    const handleListItemStatusChange = useCallback(
        (event: UIEvent): void => {
            const { dataset } = event.target
            const { index, status } = dataset

            if (index !== undefined && status) {
                // handler(Number(index), status)
                setToDoList((prevTodos): void =>
                    prevTodos.map((todo, todoIndex) =>
                        todoIndex === Number(index) ? ({
                        ...todo,
                                status: todo.status === status ? EToDoListItemStatus.New : status,
                        }) : todo
                    )
                );
            }
        },
        []
    )

    const handleFilterChange = useCallback(
        (status): void => {
            if (selectedFilters.includes(status)) {
                setSelectedFilters(prev => prev.filter(s => s !== status))
            } else {
                setSelectedFilters(prev => [...prev, status])
            }
        },
        [selectedFilters]
    )

    return (
        <div className="flex flex-col max-w-md mx-auto w-[400px] p-5 bg-slate-50 rounded-lg border-[1px] border-slate-200">
            <Title text="ToDo List"/>

            <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleAddTodo}
                placeholder="New todo..."
                className="border-[1px] rounded-[10px] border-gray-300 p-3"
            />

            <Message message={errorMessage} />

            <List itemList={filteredList} handleClick={handleListItemStatusChange} />

            <Filter selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />

            <Button onClick={handleRemoveAllTodos} label="Clear list" disabled={isEmpty(deferredList)} />
        </div>
    )
}

export { Widget as ToDoWidget }
