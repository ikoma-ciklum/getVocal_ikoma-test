import {
    type Dispatch,
    type SetStateAction,
    type KeyboardEvent,
    startTransition,
    useCallback,
    useDeferredValue,
    useState
} from "react"
import isEmpty from "lodash/isEmpty"
import { ELocalStorageKey } from "@/storages"
import { StorageService } from "@/services"
import { type TEmptyCallback, emptyCallback } from "@/helpers"
import { useTodoStore, type ITodoListStore } from "@/store"
import { EToDoListItemStatus, type ITodoListItem } from "../../types.ts"
import { useAnimations, type TUseAnimations, EAnimationVariant } from "../use-animations"

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
    const { animationClass, triggerAnimation }: TUseAnimations = useAnimations()

    // input
    const [inputValue, setInputValue]: [string, Dispatch<SetStateAction<string>>] = useState<string>()

    const handleInputChange = useCallback((event: UIEvent): void => setInputValue(event.target.value), [])

    // todos
    const {
        todoList,
        removeAllTodos,
        addTodo,
        changeTodoStatus,
        validationMessage: errorMessage,
        setValidationMessage,
        clearValidationMessage
    }: ITodoListStore = useTodoStore(state => state)

    const deferredList: ITodoListItem[] = useDeferredValue(todoList)

    const handleAddTodoItem = useCallback(
        function (): void {
            if (inputValue?.trim() === "") {
                setValidationMessage("Todo can't be empty")
                setTimeout(() => setValidationMessage(''), 2000)
            }
            if (!isEmpty(todoList?.find(({ text }) => text === inputValue))) {
                setValidationMessage("Todo already exists")
                setTimeout(() => setValidationMessage(''), 2000)
            } else {
                triggerAnimation({
                    variant: EAnimationVariant.Appearance,
                    cb: function (): void {
                        startTransition(function (): void {
                            addTodo(inputValue)
                            setInputValue(String())
                            clearValidationMessage()
                        })
                    },
                    timeout: 200
                })
            }
        },
        [todoList, errorMessage, inputValue, triggerAnimation]
    )

    const handleInputBlur: TEmptyCallback = handleAddTodoItem

    const handleInputOnKeyDown: (event: KeyboardEvent) => void = useCallback(
        function (event: KeyboardEvent): TEmptyCallback {
            event.key === "Enter" ? handleAddTodoItem() : emptyCallback()
        },
        [handleAddTodoItem]
    )

    const handleRemoveAllTodos = useCallback(
        function (): void {
            triggerAnimation({
                variant: EAnimationVariant.Removal,
                cb: function (): void {
                    startTransition(function (): void {
                        removeAllTodos()
                    })
                },
                timeout: 200
            })
        },
        [triggerAnimation]
    )

    const shouldClearButtonBeDisabled: boolean = isEmpty(deferredList)

    const handleListItemStatusChange: (event: UIEvent) => void = useCallback(function (event: UIEvent): void {
        const { dataset } = event.target
        const { index, status } = dataset

        index !== undefined && status
            ? triggerAnimation({
                  variant: EAnimationVariant.Shaking,
                  cb: function (): void {
                      startTransition(function (): void {
                          changeTodoStatus({ index, status })
                      })
                  },
                  timeout: 200
              })
            : emptyCallback()
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
        function (status: EToDoListItemStatus): void {
            triggerAnimation({
                variant: EAnimationVariant.Appearance,
                cb: () =>
                    selectedFilters.includes(status)
                        ? setSelectedFilters((prev: [EToDoListItemStatus]): [EToDoListItemStatus] =>
                              prev?.filter(s => s !== status)
                          )
                        : setSelectedFilters((prev: [EToDoListItemStatus]): [EToDoListItemStatus] => [...prev, status]),
                timeout: 200
            })
        },
        [selectedFilters, triggerAnimation]
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
