import { Sprint } from "./sprint.interface";

export interface SprintState {
    sprints: Sprint[],
    sprint?: Sprint,
    loading: boolean,
    error?: string,
    success?: boolean,
}