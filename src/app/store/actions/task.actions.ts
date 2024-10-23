import { createAction, props } from "@ngrx/store";
import { Task } from "../../core/interfaces/task.interface";

export const getTaskBySprintIdRequest = createAction(
    "[Task] Get task By SprintId Request",
    props<{sprintId: number}>()
);

export const getTaskBySprintIdSuccess = createAction(
    "[Task] Get task By SprintId Success",
    props<{tasks: Task[]}>()
);

export const TaskFailure = createAction(
    "[Task] Taks Failure",
    props<{ error: string }>()
);