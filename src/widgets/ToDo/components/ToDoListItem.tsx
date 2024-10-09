import { type FC, type ReactElement } from "react"

type TProps = { text: string }

const ListItem: FC<TProps> = ({ text }: TProps): ReactElement => {
    return (
        <li className="border-[1px] rounded-[10px] border-gray-300 p-3">
            <span className="text-base text-gray-700">{text}</span>
        </li>
    )
}

export { ListItem as ToDoListItem }
