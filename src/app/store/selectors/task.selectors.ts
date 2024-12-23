import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Comments } from "../../core/interfaces/task.interface";


export const selectTaskState = (state: AppState) => state.tasks;

export const selectTaskTodo = createSelector(
    selectTaskState,
    (state) => state.taskTodo
);

export const selectTaskInProgress = createSelector(
    selectTaskState,
    (state) => state.taskInProgress
);

export const selectTaskBlocked = createSelector(
    selectTaskState,
    (state) => state.taskBlocked
);

export const selectTaskDone = createSelector(
    selectTaskState,
    (state) => state.taskDone
);

export const selectDetailTask = createSelector(
    selectTaskState,
    (state) => state.detailedTask
);