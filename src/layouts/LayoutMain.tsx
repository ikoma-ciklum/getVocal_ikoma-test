import { type FC, type ReactElement } from "react"
import { ToDoWidget } from "../widgets"

const LayoutMain: FC = (): ReactElement => {
    return (
        <main className="flex items-center justify-center w-full bg-stone-700">
            <ToDoWidget />
        </main>
    )
}

export { LayoutMain }
