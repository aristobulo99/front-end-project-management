import { createReducer, on } from "@ngrx/store";
import { SprintState } from "../../core/interfaces/sprint-state.interface";
import { deleteSprintRequest, deleteSprintSuccesus, getSprintRequest, getSprintSuccess, pacthSprintRequest, pacthSprintSuccess, postSprintRequest, postSprintSuccess } from "../actions/sprint.actions";

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
    })),
    on(pacthSprintRequest, (state)=> ({
        ...state,
        loading: true,
        success: false
    })),
    on(pacthSprintSuccess, (state, {sprint}) => ({
        ...state,
        sprints: state.sprints.map(sp => sp.id == sprint.id ? sprint : sp),
        loading: false,
        success: true
    })),
    on(deleteSprintRequest, (state)=> ({
        ...state,
        loading: true,
        success: false
    })),
    on(deleteSprintSuccesus, (state, {sprintId})=> ({
        ...state,
        sprints: state.sprints.filter(sp => sp.id != sprintId),
        loading: true,
        success: false
    }))
)