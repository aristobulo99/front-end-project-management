import { createAction, props } from "@ngrx/store";
import { CreateSprint, Sprint, StatusSprint } from "../../core/interfaces/sprint.interface";


export const getSprintRequest = createAction(
    "[Sprints] Get Sprint Request",
    props<{projectId: number}>()
);

export const getSprintSuccess = createAction(
    "[Sprints]  Get Sprint Success",
    props<{sprints: Sprint[]}>()
);

export const getSprintIdRequest = createAction(
    "[Sprints] Get Sprint Id Request",
    props<{sprintId: number}>()
);

export const getSprintIdSuccess = createAction(
    "[Sprints] Get Sprint Id Success",
    props<{sprint: Sprint}>()
);

export const postSprintRequest = createAction(
    "[Sprints] Post Create Sprint Request",
    props<{sprint: CreateSprint}>()
);

export const postSprintSuccess = createAction(
    "[Sprints] Post Create Sprint Success",
    props<{sprint: Sprint}>()
);

export const pacthSprintRequest = createAction(
    "[Sprints] Pacth Sprint Request",
    props<{sprintId: number, sprint: CreateSprint}>()
);

export const pacthSprintSuccess = createAction(
    "[Sprints] Pacth Sprint Success",
    props<{sprint: Sprint}>()
);

export const pacthSprintStatusRequest = createAction(
    "[Sprints] Pacth Sprint Status Request",
    props<{sprintId: number, status: StatusSprint}>()
);

export const pacthSprintStatusSuccess = createAction(
    "[Sprints] Pacth Sprint Status Success",
    props<{sprint: Sprint}>()
);

export const deleteSprintRequest = createAction(
    "[Sprint] Delete Sprint Request",
    props<{sprintId: number}>()
);

export const deleteSprintSuccesus = createAction(
    "[Sprint] Delete Sprint success",
    props<{sprintId: number}>()
);

export const getSprintFailure = createAction(
    "[Sprint] Sprint Failure",
    props<{ error: string }>()
);