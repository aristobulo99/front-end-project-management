export enum RoleProject {
    DEVELOPER,
    SCRUM_MASTER,
    PROJECT_OWNER,
    PROJECT_ADMIN
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
    project: Project[]
}