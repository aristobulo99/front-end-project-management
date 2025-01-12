import { createAction, props } from "@ngrx/store";
import { Comments, CreateTask, DetailedTask, Status, Task, TransferStatus } from "../../core/interfaces/task.interface";
import { CommentCreate } from "../../core/interfaces/comment.interface";

export const getTaskBySprintIdRequest = createAction(
    "[Task] Get task By SprintId Request",
    props<{sprintId: number}>()
);

export const getTaskBySprintIdSuccess = createAction(
    "[Task] Get task By SprintId Success",
    props<{tasks: Task[]}>()
);

export const getTaskByIdRequest = createAction(
    "[Task] Get task By id Request",
    props<{taskId: number}>()
);

export const getTaskByIdSuccess = createAction(
    "[Task] Get task By id Success",
    props<{detailedTask: DetailedTask}>()
);

export const postTaskRequest = createAction(
    "[Task] Post task Request",
    props<{taskData: CreateTask}>()
);

export const postTaskSuccess = createAction(
    "[Task] Post task Success",
    props<{task: Task}>()
);

export const postTaskCommentRequest = createAction(
    "[Task-Comment] Post Task Comment Request",
    props<{commentData: CommentCreate}>()
);

export const postTaskCommentSuccess = createAction(
    "[Task-Comment] Post Task Comment Success",
    props<{comment: Comments}>()
);

export const patchTaskStatusRequest = createAction(
    "[Task] Patch task status Request",
    props<{transfer: TransferStatus}>()
);

export const patchTaskStatusSuccess = createAction(
    "[Task] Patch task status Success",
    props<{task: DetailedTask}>()
);

export const patchTaskStatusFailure = createAction(
    "[Task] Patch task status Failure",
);

export const initializeDetailedTask = createAction(
    '[Task] Initialize Detailed Task',
    props<{ detailedTask: DetailedTask }>()
);  

export const patchTaskRequest = createAction(
    "[Task] Patch task Request",
    props<{id: number, dataTask: DetailedTask}>()
);

export const patchTaskSuccess = createAction(
    "[Task] Patch task Success",
    props<{task: DetailedTask}>()
);

export const actionTasksFiltered = createAction(
    "[Task] Get tasks filtered by status",
    props<{listStatus: Status[], listUser: number[]}>() 
);

export const TaskFailure = createAction(
    "[Task] Taks Failure",
    props<{ error: string }>()
);