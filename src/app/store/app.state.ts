import { ActionReducerMap } from "@ngrx/store";
import { ProjectState } from "../core/interfaces/project-state.interface";
import { _projectsReducer } from "./reducers/project.reducers";
import { _sprintReducers } from "./reducers/sprint.reducers";
import { SprintState } from "../core/interfaces/sprint-state.interface";
import { TaskState } from "../core/interfaces/task-state.interface";
import { _taskReducers } from "./reducers/task.reducers";


export interface AppState {
    projects: ProjectState,
    sprints: SprintState,
    tasks: TaskState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    projects: _projectsReducer,
    sprints: _sprintReducers,
    tasks: _taskReducers
}