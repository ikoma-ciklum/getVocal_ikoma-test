import { type FunctionComponent, type ReactElement } from "react"
import { ToDoListItem as ListItem } from "./index.ts"
import isEmpty from "lodash/isEmpty"
import type { ITodoListItem } from "../types.ts"

type TProps = {
    itemList: ITodoListItem[]
    handleClick(event: UIEvent): void
}

const List: FunctionComponent = ({ itemList, handleClick }: TProps): ReactElement => {
    return (
        <ul className="mt-4 mb-4 [&>*:last-child]:mb-0" onClick={handleClick}>
            {!isEmpty(itemList)
                ? itemList.map((todo: ITodoListItem, idx: number) => (
                      <ListItem key={`todo-number-${idx}`} text={todo.text} status={todo.status} index={idx} />
                  ))
                : null}
        </ul>
    )
}

export { List as ToDoList }
