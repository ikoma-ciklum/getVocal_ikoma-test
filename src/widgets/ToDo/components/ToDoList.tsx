import { type FunctionComponent, type ReactElement } from "react"
import isEmpty from "lodash/isEmpty"
import classNames from "classnames"
import { useTodoStore, type ITodoListStore } from "@/store"
import { Message, EMessageVariant } from "@/components"
import type { ITodoListItem } from "../types.ts"
import { ToDoListItem as ListItem } from "./"

type TProps = {
    itemList: ITodoListItem[]
    handleClick(event: UIEvent): void
}

const List: FunctionComponent = ({ itemList, handleClick, editedTodoIndex }: TProps): ReactElement => {
    const { todoList }: ITodoListStore = useTodoStore()

    return (
        <ul
            className={classNames("my-6 [&>*:last-child]:mb-0", {
                "max-h-[250px] overflow-y-scroll with-custom-scrollbar": itemList?.length > 4
            })}
            onClick={handleClick}>
            {!isEmpty(itemList) ? (
                itemList.map((todo: ITodoListItem, idx: number) => (
                    <ListItem
                        key={`todo-number-${idx}`}
                        text={todo.text}
                        status={todo.status}
                        index={idx}
                        editedTodoIndex={editedTodoIndex}
                    />
                ))
            ) : (
                <li>
                    <Message
                        message={isEmpty(todoList) ? "No todos found" : "No todos found with this filter"}
                        variant={EMessageVariant.Info}
                    />
                </li>
            )}
        </ul>
    )
}

export { List as ToDoList }
