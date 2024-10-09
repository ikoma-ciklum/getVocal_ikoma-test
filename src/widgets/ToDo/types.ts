enum EToDoListItemStatus {
    New,
    Completed,
    InProgress,
    Closed
}

interface ITodoListItem {
    status: EToDoListItemStatus
    text: string
}

export { EToDoListItemStatus, type ITodoListItem }
