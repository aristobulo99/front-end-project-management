import { Comments, DetailedTask, Status, Task } from "./task.interface";

export interface TaskState{
    allTask: Task[],
    taskTodo: Task[],
    taskInProgress: Task[],
    taskDone: Task[],
    taskBlocked: Task[],
    listStatus: Status[],
    listUser: number[],
    detailedTask?: DetailedTask,
    comment?: Comments,
    loading: boolean,
    error?: string,
    success?: boolean,
}