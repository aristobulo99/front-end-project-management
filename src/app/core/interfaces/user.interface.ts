import { RoleProject } from "./project.interface"

export interface User {
    name: string,
    email: string,
    password: string
}

export interface UserCreate extends Omit<User, 'password'>{
    id: number
}

export interface ProjectRole extends Omit<UserCreate, 'password' | 'name' |'email'> {
    roleProject: RoleProject
}