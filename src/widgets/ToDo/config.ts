import { EToDoListItemStatus } from "./types.ts"

const itemButtonColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.InProgress]: "bg-sky-400",
    [EToDoListItemStatus.Completed]: "bg-teal-400",
    [EToDoListItemStatus.Closed]: "bg-pink-400"
}

const itemColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "bg-zinc-100",
    [EToDoListItemStatus.InProgress]: "bg-sky-100",
    [EToDoListItemStatus.Completed]: "bg-teal-100",
    [EToDoListItemStatus.Closed]: "bg-pink-100"
}

const itemTextColorsMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "text-zinc-500",
    [EToDoListItemStatus.InProgress]: "text-sky-500",
    [EToDoListItemStatus.Completed]: "text-teal-500",
    [EToDoListItemStatus.Closed]: "text-pink-500"
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

const filterLabelColorsMap: { [K in EToDoListItemStatus]: string } = itemTextColorsMap

const filterCheckboxClassNamesMap: { [K in EToDoListItemStatus]: string } = {
    [EToDoListItemStatus.New]: "focus:ring-zinc-500 checked:ring-zinc-500 focus:bg-zinc-400 checked:bg-zinc-400",
    [EToDoListItemStatus.InProgress]: "focus:ring-sky-500 checked:ring-sky-500 focus:bg-sky-400 checked:bg-sky-400",
    [EToDoListItemStatus.Completed]: "focus:ring-teal-500 checked:ring-teal-500 focus:bg-teal-400 checked:bg-teal-400",
    [EToDoListItemStatus.Closed]: "focus:ring-pink-400 checked:ring-pink-500 focus:4g-red-600 checked:bg-pink-400"
}

export {
    itemButtonColorsMap,
    itemColorsMap,
    itemTextColorsMap,
    filterLabelColorsMap,
    filterCheckboxClassNamesMap,
    itemButtonTitlesMap,
    itemFilterLabelsMap
}
