import { createReducer, on } from "@ngrx/store";
import { TaskState } from "../../core/interfaces/task-state.interface";
import { actionTasksFiltered, getTaskByIdRequest, getTaskByIdSuccess, getTaskBySprintIdRequest, getTaskBySprintIdSuccess, initializeDetailedTask, patchTaskRequest, patchTaskStatusFailure, patchTaskStatusRequest, patchTaskStatusSuccess, patchTaskSuccess, postTaskCommentRequest, postTaskCommentSuccess, postTaskRequest, postTaskSuccess } from "../actions/task.actions";
import { Comments, DetailedTask, Status } from "../../core/interfaces/task.interface";

export const initialStateTask: TaskState = {
    allTask: [],
    taskTodo: [],
    taskInProgress: [],
    taskDone: [],
    taskBlocked: [],
    listStatus: [],
    listUser: [],
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
        allTask: tasks,
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
        loading: false,
        success: true
    })),
    on(patchTaskStatusRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(patchTaskStatusSuccess, (state, {task}) => ({
        ...state,
        detailedTask: task,
        loading: false,
        success: true
    })),
    on(patchTaskStatusFailure, (state) => ({
        ...state,
        allTask: [...state.allTask],
        loading: false,
        success: false
    })),
    on(patchTaskRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(actionTasksFiltered, (state, {listStatus, listUser}) => ({
        ...state,
        listStatus,
        listUser,
        loading: true,
        success: false
    })),
    on(patchTaskSuccess, (state, {task}) => ({
        ...state,
        detailedTask: task,
        loading: false,
        success: true
    })),
)