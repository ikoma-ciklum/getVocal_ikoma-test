enum EToDoListItemStatus {
    New = "New",
    Completed = "Completed",
    InProgress = "InProgress",
    Closed = "Closed"
}

interface ITodoListItem {
    status: EToDoListItemStatus
    text: string
}

export { EToDoListItemStatus, type ITodoListItem }
