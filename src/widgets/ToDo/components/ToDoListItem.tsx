import { type FC, type ReactElement } from "react"
import type { ITodoListItem } from "../types.ts"
import { EToDoListItemStatus as EStatus } from "../types.ts"
import classNames from "classnames"
import { ToDoListItemActionButton } from "./ToDoListItemActionButton.tsx"
import { itemColorsMap, itemTextColorsMap } from "./config.ts"

type TProps = ITodoListItem & { index: number }

const ListItem: FC = ({ text, status, index }: TProps): ReactElement => (
    <li
        id={text}
        className={classNames("flex justify-between item border-[1px] rounded-[10px] border-gray-300 p-3 mb-2", {
            [itemColorsMap[status]]: status
        })}>
        <span
            className={classNames("text-base", {
                underline: status === EStatus.Closed,
                [itemTextColorsMap[status]]: status
            })}>
            {text}
        </span>
        <div>
            <ToDoListItemActionButton index={index} status={EStatus.InProgress} />
            <ToDoListItemActionButton index={index} status={EStatus.Completed} />
            <ToDoListItemActionButton index={index} status={EStatus.Closed} />
        </div>
    </li>
)

export { ListItem as ToDoListItem }
