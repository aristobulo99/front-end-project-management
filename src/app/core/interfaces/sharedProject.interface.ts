import { RoleProject } from "./project.interface"

export interface DeleteSahredProject {
    userId: number ,
    projectId: number
}

export interface EditDataRoleProject {
    email: string,
    roleProject: RoleProject
}

export interface EditRoleProject extends EditDataRoleProject {
    idProject: number,
}