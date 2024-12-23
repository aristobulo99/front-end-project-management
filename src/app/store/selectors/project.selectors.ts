import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectProjectsState = (state: AppState) => state.projects;

export const selectProjects = createSelector(
    selectProjectsState,
    (state) => state.projects
);

export const selectProjectId = createSelector(
    selectProjectsState,
    (state) => state.selectedProject
);

export const selectProjectsFeatured = createSelector(
    selectProjectsState,
    (state) => state.projects.filter(project => project.featureProject === true)
);

export const selectLoading = createSelector(
    selectProjectsState,
    (state) => state.loading
);

export const selectSuccess = createSelector(
    selectProjectsState,
    (state) => state.success
);

export const selectPatchFeatureProject = createSelector(
    selectProjectsState,
    (state) => state.patchProject
);

export const selectPostFrequentProject = createSelector(
    selectProjectsState,
    (state) => state.projects.filter(project => state.frequentProjectIds?.includes(`${project.id}`))
);

export const selectProjectUsers = createSelector(
    selectProjectsState,
    (state) => state.projectUsers
)

export const selectError = createSelector(
    selectProjectsState,
    (state) => state.error
);
