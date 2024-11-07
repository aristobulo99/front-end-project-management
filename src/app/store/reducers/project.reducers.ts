import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "../../core/interfaces/project-state.interface";
import { getProjectsFailure, getProjectsIdSuccess, getProjectsRequest, getProjectsSuccess, getProjectUsersRequest, getProjectUsersSuccess, patchDataProject, patchDataProjectSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess, postCreateProject, postCreateProjectSuccess, postFrequentProjectSuccess } from "../actions/project.actions";

export const initialStateProject: ProjectState = {
    projects: [],
    loading: false,
    error: '',
    status: "idle",
    frequentProjectIds: [],
    projectUsers: []
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
    on(getProjectsIdSuccess, (state,  {project}) => ({
        ...state,
        selectedProject: project,
        loading: false,
        success: true
    })),
    on(getProjectUsersRequest, (state) => ({
        ...state,
        loading: true,
        success: false,
    })),
    on(getProjectUsersSuccess, (state,  {projectUsers}) => ({
        ...state,
        projectUsers,
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
    on(patchDataProject, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(patchDataProjectSuccess, (state, {projectCreated}) => ({
        ...state,
        selectedProject: projectCreated,
        loading: true,
        success: false
    })),
    on(getProjectsFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false,
        success: false
    })),

);

