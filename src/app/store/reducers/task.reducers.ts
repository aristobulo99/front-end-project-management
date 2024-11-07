import { createReducer, on } from "@ngrx/store";
import { TaskState } from "../../core/interfaces/task-state.interface";
import { getTaskByIdRequest, getTaskByIdSuccess, getTaskBySprintIdRequest, getTaskBySprintIdSuccess, initializeDetailedTask, patchTaskStatusFailure, patchTaskStatusRequest, patchTaskStatusSuccess, postTaskCommentRequest, postTaskCommentSuccess, postTaskRequest, postTaskSuccess } from "../actions/task.actions";
import { Comments, DetailedTask, Status } from "../../core/interfaces/task.interface";

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
    on(getTaskByIdRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(getTaskByIdSuccess, (state, {detailedTask}) => ({
        ...state,
        detailedTask: detailedTask,
        loading: true,
        success: false
    })),
    on(initializeDetailedTask, (state, { detailedTask }) => ({
        ...state,
        detailedTask
    })),
    on(postTaskRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(postTaskSuccess, (state, {task}) => ({
        ...state,
        taskTodo: task.status === Status.TO_DO ? [...state.taskTodo, task] : [...state.taskTodo],
        taskInProgress: task.status === Status.IN_PROGRESS ? [...state.taskInProgress, task] : [...state.taskInProgress],
        taskBlocked: task.status === Status.BLOCKED ? [...state.taskBlocked, task] : [...state.taskBlocked],
        taskDone: task.status === Status.DONE ? [...state.taskDone, task] : [...state.taskDone],
        loading: true,
        success: false
    })),
    on(postTaskCommentRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(postTaskCommentSuccess, (state, {comment}) => ({
        ...state,
        detailedTask: state.detailedTask ? {...state.detailedTask, comments: [{...comment}, ...state.detailedTask.comments]} : state.detailedTask,
        loading: true,
        success: false
    })),
    on(patchTaskStatusRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(patchTaskStatusSuccess, (state, {task}) => ({
        ...state,
        taskTodo: task.status === Status.TO_DO ? [...state.taskTodo, task] : state.taskTodo.filter(ta => ta.id !== task.id),
        taskInProgress: task.status === Status.IN_PROGRESS ? [...state.taskInProgress, task] : state.taskInProgress.filter(ta => ta.id !== task.id),
        taskBlocked: task.status === Status.BLOCKED ? [...state.taskBlocked, task] : state.taskBlocked.filter(ta => ta.id !== task.id),
        taskDone: task.status === Status.DONE ? [...state.taskDone, task] : state.taskDone.filter(ta => ta.id !== task.id),
        detailedTask: task,
        loading: true,
        success: false
    })),
    on(patchTaskStatusFailure, (state) => ({
        ...state,
        taskTodo: [...state.taskTodo],
        taskInProgress: [...state.taskInProgress],
        taskBlocked: [...state.taskBlocked],
        taskDone: [...state.taskDone],
        loading: false,
        success: false
    })),
)