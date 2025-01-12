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
        taskTodo: [...state.taskTodo],
        taskInProgress: [...state.taskInProgress],
        taskBlocked: [...state.taskBlocked],
        taskDone: [...state.taskDone],
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
        taskTodo: state.allTask.filter(tt =>  tt.status == Status.TO_DO).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
        taskInProgress: state.allTask.filter(tt =>  tt.status == Status.IN_PROGRESS).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
        taskBlocked: state.allTask.filter(tt =>  tt.status == Status.BLOCKED).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
        taskDone: state.allTask.filter(tt =>  tt.status == Status.DONE).filter(t => listStatus.length === 0 && listUser.length === 0 ? false : listStatus.includes(t.status) && listUser.includes(t.assignedUser)),
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