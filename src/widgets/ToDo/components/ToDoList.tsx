import { type FunctionComponent, type ReactElement } from "react"
import isEmpty from "lodash/isEmpty"
import classNames from "classnames"
import type { ITodoListItem } from "../types.ts"
import { ToDoListItem as ListItem } from "./"

type TProps = {
    itemList: ITodoListItem[]
    handleClick(event: UIEvent): void
}

const List: FunctionComponent = ({ itemList, handleClick }: TProps): ReactElement => (
    <ul
        className={classNames("my-6 [&>*:last-child]:mb-0", {
            "max-h-[250px] overflow-y-scroll with-custom-scrollbar": itemList?.length > 4
        })}
        onClick={handleClick}>
        {!isEmpty(itemList)
            ? itemList.map((todo: ITodoListItem, idx: number) => (
                  <ListItem key={`todo-number-${idx}`} text={todo.text} status={todo.status} index={idx} />
              ))
            : null}
    </ul>
)

export { List as ToDoList }
