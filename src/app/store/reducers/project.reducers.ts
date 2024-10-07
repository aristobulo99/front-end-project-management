import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "../../core/interfaces/project-state.interface";
import { getProjectsFailure, getProjectsRequest, getProjectsSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess } from "../actions/project.actions";

export const initialStateProject: ProjectState = {
    projects: [],
    loading: false,
    error: '',
    status: "idle"
}

export const _projectsReducer = createReducer(
    initialStateProject,
    on(getProjectsRequest, (state) => ({
        ...state,
        loading: true,
        success: false,
    })),
    on(getProjectsSuccess, (state,  {projects}) => ({
        ...state,
        projects,
        loading: false,
        success: true
    })),
    on(patchOutstandingProjectRequest, (state) => ({
        ...state,
        loading: true,
        success: false,
    })),
    on(patchOutstandingProjectSuccess, (state, {project}) => ({
        ...state,
        patchProject: project,
        projects: state.projects.map((p) => p.id === project.project_id ? {...p, featureProject: project.feature_project } : p),
        loading: true,
        success: false,
    })),
    on(getProjectsFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false,
        success: false
    })),

);

