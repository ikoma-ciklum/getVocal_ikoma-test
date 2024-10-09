import { type FC, type ReactElement } from "react"
import { ToDoList as List } from "./components/ToDoList.tsx"
import { ToDoListFilter as Filter } from "./components"

const Widget: FC = (): ReactElement => {
    return (
        <div className="flex flex-col">
            <List />
            <Filter />
        </div>
    )
}

export { Widget as ToDoWidget }
