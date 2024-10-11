import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectSprintState = (state: AppState) => state.sprints;

export const selectSprints = createSelector(
    selectSprintState,
    (state) => state.sprints
)