import { EToDoListItemStatus } from "./types.ts"

const itemButtonColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.InProgress]: "bg-blue-400",
    [EToDoListItemStatus.Completed]: "bg-green-400",
    [EToDoListItemStatus.Closed]: "bg-red-400"
}

const itemColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "bg-zinc-100",
    [EToDoListItemStatus.InProgress]: "bg-blue-200",
    [EToDoListItemStatus.Completed]: "bg-green-200",
    [EToDoListItemStatus.Closed]: "bg-red-200"
}

const itemTextColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "text-zinc-500",
    [EToDoListItemStatus.InProgress]: "text-blue-600",
    [EToDoListItemStatus.Completed]: "text-green-600",
    [EToDoListItemStatus.Closed]: "text-red-400"
}

const itemButtonTitlesMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.InProgress]: "Start progress",
    [EToDoListItemStatus.Completed]: "Complete item",
    [EToDoListItemStatus.Closed]: "Close item"
}

const itemFilterLabelsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "New",
    [EToDoListItemStatus.InProgress]: "In progress",
    [EToDoListItemStatus.Completed]: "Completed",
    [EToDoListItemStatus.Closed]: "Closed"
}

export { itemButtonColorsMap, itemColorsMap, itemTextColorsMap, itemButtonTitlesMap, itemFilterLabelsMap }
