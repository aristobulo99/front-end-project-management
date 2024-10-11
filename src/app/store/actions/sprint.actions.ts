import { createAction, props } from "@ngrx/store";
import { CreateSprint, Sprint } from "../../core/interfaces/sprint.interface";


export const getSprintRequest = createAction(
    "[Sprints] Get Sprint Request",
    props<{projectId: number}>()
);

export const getSprintSuccess = createAction(
    "[Sprints]  Get Sprint Success",
    props<{sprints: Sprint[]}>()
);

export const postSprintRequest = createAction(
    "[Sprints] Post Create Sprint Request",
    props<{sprint: CreateSprint}>()
);

export const postSprintSuccess = createAction(
    "[Sprints] Post Create Sprint Success",
    props<{sprint: Sprint}>()
);


export const getSprintFailure = createAction(
    "[Sprint] Sprint Failure",
    props<{ error: string }>()
);