import { createReducer, on } from "@ngrx/store";
import { SprintState } from "../../core/interfaces/sprint-state.interface";
import { getSprintRequest, getSprintSuccess, postSprintRequest, postSprintSuccess } from "../actions/sprint.actions";

export const initialStateSprint: SprintState = {
    sprints: [],
    loading: false,
    error: '',
    sprint: undefined,
    success: false
}

export const _sprintReducers = createReducer(
    initialStateSprint,
    on(getSprintRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(getSprintSuccess, (state, {sprints}) => ({
        ...state,
        sprints: sprints,
        loading: false,
        success: true
    })),
    on(postSprintRequest, (state) => ({
        ...state,
        loading: true,
        success: false
    })),
    on(postSprintSuccess, (state, {sprint}) => ({
        ...state,
        sprints: [sprint, ...state.sprints],
        loading: false,
        success: true
    }))
)