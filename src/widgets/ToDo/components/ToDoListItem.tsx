import { type FC, type ReactElement } from "react"
import classNames from "classnames"
import type { ITodoListItem } from "../types.ts"
import { EToDoListItemStatus as EStatus } from "../types.ts"
import { ToDoListItemActionButton } from "./ToDoListItemActionButton.tsx"
import { itemColorsMap, itemTextColorsMap } from "../config.ts"

type TProps = ITodoListItem & { index: number }

const ListItem: FC = ({ text, status, index }: TProps): ReactElement => (
    <li
        tabIndex={0}
        id={text}
        className={classNames(
            "flex justify-between item border-[1px] rounded-[10px] border-gray-300 p-3 mb-2 focus:outline-transparent focus:outline-0 focus:ring-1",
            {
                [itemColorsMap[status]]: status
            }
        )}>
        <span
            className={classNames("text-base text-sm select-none", {
                "font-semibold": status === EStatus.Completed,
                italic: status === EStatus.InProgress,
                "line-through": status === EStatus.Closed,
                [itemTextColorsMap[status]]: status
            })}>
            {text}
        </span>
        <div className="flex items-center self-center max-h-[20px]">
            <ToDoListItemActionButton index={index} status={EStatus.InProgress} />
            <ToDoListItemActionButton index={index} status={EStatus.Completed} />
            <ToDoListItemActionButton index={index} status={EStatus.Closed} />
        </div>
    </li>
)

export { ListItem as ToDoListItem }
