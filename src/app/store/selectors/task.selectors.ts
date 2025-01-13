import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Comments, Status } from "../../core/interfaces/task.interface";


export const selectTaskState = (state: AppState) => state.tasks;

export const selectAllTask = createSelector(selectTaskState,(state) => state.allTask);

export const selectListStates = createSelector(selectTaskState,(state) => state.listStatus);

export const selectListUser = createSelector(selectTaskState,(state) => state.listUser);

export const selectTasks = createSelector(
    selectAllTask,
    selectListStates,
    selectListUser,
    (allTask, listStatus, listUser) => {
        return {
            taskTodo: allTask.filter(tt =>  tt.status == Status.TO_DO).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
            taskInProgress: allTask.filter(tt =>  tt.status == Status.IN_PROGRESS).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
            taskBlocked: allTask.filter(tt =>  tt.status == Status.BLOCKED).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
            taskDone: allTask.filter(tt =>  tt.status == Status.DONE).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
        }
    }
);

export const selectDetailTask = createSelector(
    selectTaskState,
    (state) => state.detailedTask
);