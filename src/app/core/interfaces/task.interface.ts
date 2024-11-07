

export enum Status {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    BLOCKED = 'BLOCKED'
}

export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM' ,
    LOW = 'LOW',
}

export interface CreateTask {
    title: string,
    description?: string,
    priority: Priority,
    status: Status,
    storyPoints?: number,
    initDate?: Date,
    endDate?: Date,
    sprintId: number,
    assignedUser: number
}

export interface Task extends CreateTask {
    id: number
}

export interface DragDropTask {
    titleStatus: string;
    status: Status,
    tasks: Task[]
}

export interface TransferStatus {
    taskId: number,
    status: Status
}

export interface StatusHistory{
    id: number,
    taskId: number,
    previousState: Status,
    newStatus: Status,
    dateChange: Date,
    responsibleUser: number
}

export interface Comments {
    id: number,
    taskId: number,
    userAuthor: number,
    content: string,
    creationDate: Date,
    etag: string
}

export interface DetailedTask extends Task {
    creatingDate: Date,
    updateDate: Date,
    statusHistory: StatusHistory[],
    comments: Comments[]

}