import { FC, ReactElement } from "react"
import classNames from "classnames"
import { EToDoListItemStatus } from "../types.ts"
import { itemButtonColorsMap as colorsMap, itemButtonTitlesMap as titleMap } from "../config.ts"

const ActionButton: FC = ({ index, status }: { index: number; status: EToDoListItemStatus }): ReactElement => (
    <button
        data-index={index}
        data-status={status}
        title={titleMap[status]}
        className={classNames("ml-1 mr-1 p-2 rounded focus:outline-1 focus:outlin-0 focus:outline-transparent focus:ring-1", { [colorsMap[status]]: status })}
    />
)

export { ActionButton as ToDoListItemActionButton }
