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
    userId: number,
    userName: string,
    projectId: number,
    projectName: string,
    projectDescription: string,
    startDate: Date,
    endDate: Date,
    roleProject: RoleProject,
    outstanding: boolean
}

export interface SectionProject {
    icon?: string,
    title: string,
    project: Observable<Project[]>
}

export interface Outstanding extends Omit<ProjectCreate, 'name' | 'description' | 'startDate' | 'endingDate'>{}

export interface PatchDataOutstanding{
    id: number,
    outstanding: Outstanding
}