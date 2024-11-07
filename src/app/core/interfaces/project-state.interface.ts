import { PatchProject, Project, ProjectCreate, ProjectUsers } from "./project.interface";

export interface ProjectState {
    projects: Project[],
    selectedProject?: ProjectCreate,
    patchProject?: PatchProject,
    frequentProjectIds?: string[],
    projectUsers: ProjectUsers[],
    loading: boolean,
    error?: string,
    success?: boolean,
    status?: 'idle' | 'loading' | 'success' | 'error';
}