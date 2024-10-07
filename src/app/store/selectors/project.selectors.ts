import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectProjectsState = (state: AppState) => state.projects;

export const selectProjects = createSelector(
    selectProjectsState,
    (state) => state.projects
);

export const selectProjectsFeatured = createSelector(
    selectProjectsState,
    (state) => state.projects.filter(project => project.outstanding === true)
);

export const selectLoading = createSelector(
    selectProjectsState,
    (state) => state.loading
);

export const selectSuccess = createSelector(
    selectProjectsState,
    (state) => state.success
);

export const selectPatchProject = createSelector(
    selectProjectsState,
    (state) => state.patchProject
);

export const selectError = createSelector(
    selectProjectsState,
    (state) => state.error
);
