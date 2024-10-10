import { create } from "zustand"
import { type ITodoListItem, EToDoListItemStatus } from "@/widgets/ToDo/types.ts"
import { StorageService } from "@/services"
import { ELocalStorageKey } from "@/storages"
import type { TEmptyCallback } from "@/helpers"

interface ITodoListStore {
    todoList: ITodoListItem[]
    editTodoIndex: null | number
    editInputValue: string
    validationMessage: string
    setValidationMessage(value: string): void
    clearValidationMessage: TEmptyCallback
    setTodoList(todoList: ITodoListItem[]): void
    setEditTodoIndex(index: null | number): void
    setEditInputValue(value: string): void
    saveEdit: TEmptyCallback
    addTodo(text: string): void
    changeTodoStatus({ index, status }: { index: number; status: EToDoListItemStatus }): void
    removeAllTodos: TEmptyCallback
}

const storageService: StorageService = new StorageService()

const useTodoStore = create<ITodoListStore>(function (set) {
    return {
        todoList: storageService.getItem(ELocalStorageKey.TodoList) || [],
        editTodoIndex: null,
        editInputValue: String(),
        validationMessage: String(),
        setValidationMessage: function (value: string): void {
            set({ validationMessage: value })
        },
        clearValidationMessage: function (): void {
            set({ validationMessage: String() })
        },
        setTodoList: function (todos: ITodoListItem[]): void {
            set(function (): void {
                storageService.setItem(ELocalStorageKey.TodoList, todos)
                return { todoList: todos }
            })
        },
        setEditTodoIndex: function (index: number | null): void {
            set({ editTodoIndex: index })
        },
        setEditInputValue: function (value: string): void {
            set(function (state) {
                return value !== state.editInputValue ? { editInputValue: value } : state
            })
        },
        saveEdit: function (): void {
            set(function (state) {
                const updatedTodos = state.todoList.map((todo, todoIndex) => {
                    if (todoIndex === state.editTodoIndex) {
                        return {
                            ...todo,
                            text: state.editInputValue.trim()
                        }
                    }
                    return todo
                })

                storageService.setItem(ELocalStorageKey.TodoList, updatedTodos)
                return {
                    todoList: updatedTodos,
                    editTodoIndex: null,
                    editInputValue: ""
                }
            })
        },
        addTodo: function (text: string): void {
            set(function (state) {
                const newTodo: ITodoListItem = { status: EToDoListItemStatus.New, text }

                const updatedTodos: ITodoListItem[] = [...state.todoList, newTodo]

                state.setTodoList(updatedTodos)

                return { todoList: updatedTodos, validationMessage: String() }
            })
        },
        changeTodoStatus: function ({ index, status }: { index: string; status: EToDoListItemStatus }): void {
            set(function (state) {
                const updatedList = state.todoList.map((todo, todoIndex) =>
                    todoIndex === Number(index)
                        ? {
                              ...todo,
                              status: todo.status === status ? EToDoListItemStatus.New : status
                          }
                        : todo
                )
                state.setTodoList(updatedList)
                return { todoList: updatedList }
            })
        },
        removeAllTodos: function (): void {
            set(function (state): void {
                storageService.removeItem(ELocalStorageKey.TodoList)
                state.setTodoList([])
                state.clearValidationMessage()
                return { todoList: [] }
            })
        }
    }
})

export { useTodoStore, type ITodoListStore }
