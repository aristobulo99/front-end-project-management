import { createAction, props } from "@ngrx/store";
import { CreateTask, Task, TransferStatus } from "../../core/interfaces/task.interface";

export const getTaskBySprintIdRequest = createAction(
    "[Task] Get task By SprintId Request",
    props<{sprintId: number}>()
);

export const getTaskBySprintIdSuccess = createAction(
    "[Task] Get task By SprintId Success",
    props<{tasks: Task[]}>()
);

export const postTaskRequest = createAction(
    "[Task] Post task Request",
    props<{taskData: CreateTask}>()
);

export const postTaskSuccess = createAction(
    "[Task] Post task Success",
    props<{task: Task}>()
);

export const patchTaskStatusRequest = createAction(
    "[Task] Patch task status Request",
    props<{transfer: TransferStatus}>()
);

export const patchTaskStatusSuccess = createAction(
    "[Task] Patch task status Success",
    props<{task: Task}>()
);

export const patchTaskStatusFailure = createAction(
    "[Task] Patch task status Failure",
);

export const TaskFailure = createAction(
    "[Task] Taks Failure",
    props<{ error: string }>()
);