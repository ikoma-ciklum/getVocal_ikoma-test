import { type FC, type ReactElement } from "react"
import { ToDoList } from "../components"

const Main: FC = (): ReactElement => {
    return (
        <main>
            <ToDoList />
        </main>
    )
}

export { Main as LayoutMain }
