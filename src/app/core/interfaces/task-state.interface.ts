import { Comments, DetailedTask, Task } from "./task.interface";

export interface TaskState{
    taskTodo: Task[],
    taskInProgress: Task[],
    taskDone: Task[],
    taskBlocked: Task[],
    detailedTask?: DetailedTask,
    comment?: Comments,
    loading: boolean,
    error?: string,
    success?: boolean,
}