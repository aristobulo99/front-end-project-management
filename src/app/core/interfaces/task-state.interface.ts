import { Task } from "./task.interface";

export interface TaskState{
    taskTodo: Task[],
    taskInProgress: Task[],
    taskDone: Task[],
    taskBlocked: Task[],
    loading: boolean,
    error?: string,
    success?: boolean,
}