import { Observable } from "rxjs"

export enum RoleProject {
    DEVELOPER,
    SCRUM_MASTER,
    PROJECT_OWNER,
    PROJECT_ADMIN
}

export interface ProjectCreate {
    name: string,
    description: string,
    startDate: Date,
    endingDate: Date,
    outstanding: boolean
}

export interface Project {
    id: number,
    name: string,
    description: string,
    startDate: Date,
    endingDate: Date,
    outstanding: boolean,
    projectEnable: boolean,
    featureProject: boolean
}

export interface SectionProject {
    icon?: string,
    title: string,
    project: Project[]
}


export interface PatchFeature{
    id: number,
    feature: boolean
}

export interface PatchProject {
    id: number,
    project_id: number,
    user_id: number,
    roleProject: RoleProject,
    feature_project: boolean
}