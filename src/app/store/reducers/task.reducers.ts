import { createReducer, on } from "@ngrx/store";
import { TaskState } from "../../core/interfaces/task-state.interface";
import { getTaskBySprintIdRequest, getTaskBySprintIdSuccess } from "../actions/task.actions";
import { Status } from "../../core/interfaces/task.interface";

export const initialStateTask: TaskState = {
    taskTodo: [],
    taskInProgress: [],
    taskDone: [],
    taskBlocked: [],
    error: '',
    loading: false,
    success: false,
}

export const _taskReducers = createReducer(
    initialStateTask,
    on(getTaskBySprintIdRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(getTaskBySprintIdSuccess, (state, {tasks}) => ({
        ...state,
        taskTodo: tasks.filter(tt =>  tt.status == Status.TO_DO),
        taskInProgress: tasks.filter(tt =>  tt.status == Status.IN_PROGRESS),
        taskBlocked: tasks.filter(tt =>  tt.status == Status.BLOCKED),
        taskDone: tasks.filter(tt =>  tt.status == Status.DONE),
        loading: true,
        success: false
    })),
)