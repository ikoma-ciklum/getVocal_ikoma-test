import {
    type Dispatch,
    type SetStateAction,
    type KeyboardEvent,
    startTransition,
    useCallback,
    useDeferredValue,
    useLayoutEffect,
    useState
} from "react"
import isEmpty from "lodash/isEmpty"
import { ELocalStorageKey } from "@/storages"
import { StorageService } from "@/services"
import { type TEmptyCallback, emptyCallback } from "@/helpers"
import { EToDoListItemStatus, type ITodoListItem } from "../../types.ts"
import "./animations.css"

const storageService: StorageService = new StorageService()

type TUseHook = {
    errorMessage: string
    inputValue: string
    handleInputChange(event: UIEvent): void
    handleInputBlur: TEmptyCallback
    handleInputOnKeyDown(event: KeyboardEvent): void
    filteredToDoList: ITodoListItem[]
    selectedFilters: [EToDoListItemStatus]
    handleFilterChange
    handleListItemStatusChange
    handleRemoveAllTodos
    shouldClearButtonBeDisabled
    animationClass: string
}

function useHook(): ReturnType<() => TUseHook> {
    // animations

    const [animationClass, setAnimationClass]: [string, Dispatch<SetStateAction<string>>] = useState(String())

    const triggerListItemAddAnimation: TEmptyCallback = useCallback(
        (): void => (
            setAnimationClass("todo-enter"),
            setTimeout(
                (): void => (
                    setAnimationClass("todo-enter-active"), setTimeout((): void => setAnimationClass(String()), 200)
                ),
                100
            )
        ),
        []
    )

    const triggerListItemClearAnimation: (onClear: TEmptyCallback) => void = useCallback(
        (onClear: TEmptyCallback) => (
            setAnimationClass("todo-exit"),
            setTimeout((): void => (setAnimationClass("todo-exit-active"), setTimeout((): void => onClear(), 300)), 100)
        ),
        []
    )

    // input

    const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState<string>(String())

    const handleInputChange = useCallback((event: UIEvent): void => {
        setErrorMessage(String())
        setInputValue(event.target.value)
    }, [])

    // todos

    const [todoList, setToDoList]: [ITodoListItem[], Dispatch<SetStateAction<ITodoListItem[]>>] = useState<
        ITodoListItem[]
    >(storageService.getItem(ELocalStorageKey.TodoList) || [])

    const deferredList: ITodoListItem[] = useDeferredValue(todoList)

    useLayoutEffect(
        (): void => (!isEmpty(todoList) && storageService.setItem(ELocalStorageKey.TodoList, todoList), void 0),
        [todoList]
    )

    const handleAddTodoItem = useCallback((): void => {
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
                setInputValue(String()),
                triggerListItemAddAnimation()
            )
        )
    }, [todoList, inputValue, triggerListItemAddAnimation])

    const handleInputBlur: TEmptyCallback = handleAddTodoItem

    const handleInputOnKeyDown: (event: KeyboardEvent) => void = useCallback(
        (event: KeyboardEvent): void => (event.key === "Enter" ? handleAddTodoItem() : emptyCallback()),
        [handleAddTodoItem]
    )

    const handleRemoveAllTodos = useCallback(
        (): void =>
            triggerListItemClearAnimation(() =>
                startTransition((): void => (storageService.clearStorage(), setToDoList([])))
            ),
        [triggerListItemClearAnimation]
    )

    const shouldClearButtonBeDisabled: boolean = isEmpty(deferredList)

    const handleListItemStatusChange = useCallback((event: UIEvent): void => {
        const { dataset } = event.target
        const { index, status } = dataset

        if (index !== undefined && status) {
            setToDoList((prevTodos): void =>
                prevTodos.map((todo, todoIndex) =>
                    todoIndex === Number(index)
                        ? (setAnimationClass("todo-status-change"),
                          setTimeout(() => {
                              setAnimationClass("todo-status-change-active")
                          }, 200),
                          {
                              ...todo,
                              status: todo.status === status ? EToDoListItemStatus.New : status
                          })
                        : todo
                )
            )
        }
    }, [])

    // filters

    const [selectedFilters, setSelectedFilters]: [
        [EToDoListItemStatus],
        Dispatch<SetStateAction<[EToDoListItemStatus]>>
    ] = useState((storageService.getItem(ELocalStorageKey.TodoList) || [])?.map(({ status }) => status))

    const filteredToDoList: ITodoListItem[] = useDeferredValue(
        !isEmpty(selectedFilters)
            ? deferredList?.filter((t: ITodoListItem) => selectedFilters.includes(t.status))
            : deferredList
    )

    const handleFilterChange = useCallback(
        (status: EToDoListItemStatus): void =>
            selectedFilters.includes(status)
                ? setSelectedFilters((prev: [EToDoListItemStatus]): [EToDoListItemStatus] =>
                      prev.filter(s => s !== status)
                  )
                : setSelectedFilters((prev: [EToDoListItemStatus]): [EToDoListItemStatus] => [...prev, status]),
        [selectedFilters]
    )

    return {
        errorMessage,
        inputValue,
        handleInputChange,
        handleInputBlur,
        handleInputOnKeyDown,
        filteredToDoList,
        selectedFilters,
        handleFilterChange,
        handleListItemStatusChange,
        handleRemoveAllTodos,
        shouldClearButtonBeDisabled,
        animationClass
    }
}

export { useHook as useToDoList, type TUseHook as TUseToDoList }
