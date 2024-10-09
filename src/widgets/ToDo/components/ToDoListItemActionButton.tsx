import { FC, ReactElement } from "react"
import classNames from "classnames"
import { EToDoListItemStatus } from "../types.ts"
import { itemButtonColorsMap as colorsMap, itemButtonTitlesMap as titleMap } from "./config.ts"

const ActionButton: FC = ({ index, status }: { index: number; status: EToDoListItemStatus }): ReactElement => (
    <button
        data-index={index}
        data-status={status}
        title={titleMap[status]}
        className={classNames("ml-1 mr-1 p-2 rounded", { [colorsMap[status]]: status })}
    />
)

export { ActionButton as ToDoListItemActionButton }
