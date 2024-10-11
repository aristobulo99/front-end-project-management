import { ActionReducerMap } from "@ngrx/store";
import { ProjectState } from "../core/interfaces/project-state.interface";
import { _projectsReducer } from "./reducers/project.reducers";
import { _sprintReducers } from "./reducers/sprint.reducers";
import { SprintState } from "../core/interfaces/sprint-state.interface";


export interface AppState {
    projects: ProjectState,
    sprints: SprintState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    projects: _projectsReducer,
    sprints: _sprintReducers
}