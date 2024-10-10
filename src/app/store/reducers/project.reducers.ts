import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "../../core/interfaces/project-state.interface";
import { getProjectsFailure, getProjectsRequest, getProjectsSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess, postCreateProject, postCreateProjectSuccess, postFrequentProjectSuccess } from "../actions/project.actions";

export const initialStateProject: ProjectState = {
    projects: [],
    loading: false,
    error: '',
    status: "idle",
    frequentProjectIds: []
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
    on(postFrequentProjectSuccess, (state, { projectIds }) => ({
        ...state,
        projects: state.projects,
        frequentProjectIds: projectIds,
        loading: true,
        success: false,
    })),
    on(postCreateProject, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(postCreateProjectSuccess, (state, {projectCreated}) => ({
        ...state,
        projects: [{...projectCreated, featureProject: false, projectEnable: true}, ...state.projects],
        loading: false,
        success: true
    })),
    on(getProjectsFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false,
        success: false
    })),

);

