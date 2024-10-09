import { EToDoListItemStatus } from "../types.ts"

const itemButtonColorsMap = {
    [EToDoListItemStatus.InProgress]: "bg-blue-400",
    [EToDoListItemStatus.Completed]: "bg-green-400",
    [EToDoListItemStatus.Closed]: "bg-red-400"
}

const itemColorsMap = {
    [EToDoListItemStatus.New]: "bg-stone-200",
    [EToDoListItemStatus.InProgress]: "bg-blue-200",
    [EToDoListItemStatus.Completed]: "bg-green-200",
    [EToDoListItemStatus.Closed]: "bg-red-200"
}

const itemTextColorsMap = {
    [EToDoListItemStatus.New]: "text-stone-400",
    [EToDoListItemStatus.InProgress]: "text-blue-600",
    [EToDoListItemStatus.Completed]: "text-green-600",
    [EToDoListItemStatus.Closed]: "text-red-400"
}

const itemButtonTitlesMap = {
    [EToDoListItemStatus.InProgress]: "Put item in progress",
    [EToDoListItemStatus.Completed]: "Complete item",
    [EToDoListItemStatus.Closed]: "Close item"
}

export { itemButtonColorsMap, itemColorsMap, itemTextColorsMap, itemButtonTitlesMap }
