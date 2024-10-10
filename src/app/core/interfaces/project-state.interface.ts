import { PatchProject, Project, ProjectCreate } from "./project.interface";

export interface ProjectState {
    projects: Project[],
    selectedProject?: ProjectCreate,
    patchProject?: PatchProject,
    frequentProjectIds?: string[]
    loading: boolean,
    error?: string,
    success?: boolean,
    status?: 'idle' | 'loading' | 'success' | 'error';
}