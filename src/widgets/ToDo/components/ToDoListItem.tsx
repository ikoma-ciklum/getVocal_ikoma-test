import { type FC, type ReactElement } from "react"
import classNames from "classnames"
import { useTodoStore, type ITodoListStore } from "@/store"
import { emptyCallback, type TEmptyCallback } from "@/helpers"
import { Input } from "@/components"
import type { ITodoListItem } from "../types.ts"
import { EToDoListItemStatus as EStatus } from "../types.ts"
import { ToDoListItemActionButton } from "./ToDoListItemActionButton.tsx"
import { itemColorsMap, itemTextColorsMap } from "../config.ts"

type TProps = ITodoListItem & { index: number }

const ListItem: FC = ({ text, status, index }: TProps): ReactElement => {
    const { editTodoIndex, editInputValue, setEditTodoIndex, setEditInputValue, saveEdit }: ITodoListStore =
        useTodoStore()

    const toggleEditMode: TEmptyCallback = (): void => setEditTodoIndex(index)

    return (
        <li
            tabIndex={0}
            id={text}
            className={classNames(
                "flex justify-between item border-[1px] rounded-[10px] border-gray-300 px-3 h-[50px] items-center mb-2 focus:outline-transparent focus:outline-0 focus:ring-1",
                {
                    [itemColorsMap[status]]: status
                }
            )}>
            <div className="w-full h-[20px] flex items-center" onDoubleClick={toggleEditMode} onClick={toggleEditMode}>
                {editTodoIndex === index ? (
                    <Input
                        type="text"
                        value={editInputValue}
                        onChange={e => setEditInputValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={e => (e.key === "Enter" ? saveEdit() : emptyCallback())}
                        className="bg-transparent h-[20px] w-full rounded-md text-sm text-gray-500"
                    />
                ) : (
                    <span
                        onClick={toggleEditMode}
                        className={classNames("text-base text-sm select-none", {
                            "font-semibold": status === EStatus.Completed,
                            italic: status === EStatus.InProgress,
                            "line-through": status === EStatus.Closed,
                            [itemTextColorsMap[status]]: status
                        })}>
                        {text || editInputValue}
                    </span>
                )}
            </div>
            <div className="flex items-center self-center max-h-[20px]">
                <ToDoListItemActionButton index={index} status={EStatus.InProgress} />
                <ToDoListItemActionButton index={index} status={EStatus.Completed} />
                <ToDoListItemActionButton index={index} status={EStatus.Closed} />
            </div>
        </li>
    )
}

export { ListItem as ToDoListItem }
