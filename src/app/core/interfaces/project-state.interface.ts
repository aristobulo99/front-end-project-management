import { PatchProject, Project, ProjectCreate } from "./project.interface";

export interface ProjectState {
    projects: Project[],
    selectedProject?: Project,
    patchProject?: PatchProject,
    loading: boolean,
    error?: string,
    success?: boolean,
    status?: 'idle' | 'loading' | 'success' | 'error';
}