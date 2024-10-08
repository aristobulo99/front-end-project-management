import { ActionReducerMap } from "@ngrx/store";
import { ProjectState } from "../core/interfaces/project-state.interface";
import { _projectsReducer } from "./reducers/project.reducers";


export interface AppState {
    projects: ProjectState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    projects: _projectsReducer
}