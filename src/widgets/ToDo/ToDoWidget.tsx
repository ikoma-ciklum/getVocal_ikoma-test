import { type FC, type ReactElement } from "react"
import { Button, Input, Message, Title } from "@/components"
import { ToDoList as List } from "./components/ToDoList.tsx"
import { ToDoListFilter as Filter } from "./components"
import { useToDoList, type TUseToDoList } from "./hooks"

const Widget: FC = (): ReactElement => {
    const {
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
    }: TUseToDoList = useToDoList()

    return (
        <div className="flex flex-col max-w-md mx-auto w-[400px] p-5 bg-slate-50 rounded-lg border-[1px] border-slate-200">
            <Title text="ToDo List" />

            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputOnKeyDown}
                onBlur={handleInputBlur}
                placeholder="New todo..."
                className="border-[1px] rounded-[10px] border-gray-300 p-3"
            />

            <Message message={errorMessage} />

            <div className={animationClass}>
                <List itemList={filteredToDoList} handleClick={handleListItemStatusChange} />
            </div>

            <Filter selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />

            <Button onClick={handleRemoveAllTodos} label="Clear list" disabled={shouldClearButtonBeDisabled} />
        </div>
    )
}

export { Widget as ToDoWidget }
