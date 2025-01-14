import { createAction, props } from "@ngrx/store";
import { PatchFeature, PatchProject, Project, ProjectCreate, ProjectCreateResponse, ProjectUsers, shareProject } from "../../core/interfaces/project.interface";
import { DeleteSahredProject, EditDataRoleProject, EditRoleProject } from "../../core/interfaces/sharedProject.interface";

/*
la acción es un mensaje que comunica a los reducers o efectos para que ejecuten una operación. Cuando despachas una acción:
    *Los reducers actualizan el estado según la lógica definida.
    *Los efectos realizan tareas como llamadas a servicios o APIs externas.
*/

//Solicitud de obtener proyectos
    // Accion para iniciar la obtención de todos lo elementos Project
    export const getProjectsRequest = createAction(
        "[Projects] Get Projects Request"
    );

    // Esta acción se despacha cuando los proyectos se obtienen correctamente
    export const getProjectsSuccess = createAction(
        "[Projects] Get Projects Success",
        props<{ projects: Project[] }>()
    );

//Solicitud de obtener un proyecto por id
    // Accion para iniciar la obtención del elemento Project
    export const getProjectsIdRequest = createAction(
        "[Projects] Get Project Id Request",
        props<{projectId: number}>()
    );

    // Esta acción se despacha cuando el proyecto se obtienen correctamente
    export const getProjectsIdSuccess = createAction(
        "[Projects] Get Project Id Success",
        props<{ project: ProjectCreate }>()
    );

    export const getProjectUsersRequest = createAction(
        "[Projects] Get Project Users Request",
        props<{projectId: number}>()
    );

    export const getProjectUsersSuccess = createAction(
        "[Projects] Get Project Users Success",
        props<{projectUsers: ProjectUsers[]}>()
    );

    export const postShareProjectRequest  = createAction(
        "[Project] post Share Project Request", 
        props<{shared: shareProject}>()
    );

    export const postShareProjectSuccess  = createAction(
        "[Project] post Share Project Success", 
        props<{projectUser: ProjectUsers}>()
    );

    export const deleteShareProjectRequest  = createAction(
        "[Project] delete Share Project Request", 
        props<{deleteShared: DeleteSahredProject}>()
    );

    export const deleteShareProjectSuccess  = createAction(
        "[Project] delete Share Project Success", 
        props<{userId: number}>()
    );

    export const editShareProjectRequest  = createAction(
        "[Project] edit Share Project Request", 
        props<{editShared: EditRoleProject}>()
    );

    export const editShareProjectSuccess  = createAction(
        "[Project] edit Share Project Success", 
        props<{edition: EditDataRoleProject}>()
    );

//Solicitud para actualizar el estado destacado
    // Accion para inicial la actualizacion del estado
    export const patchOutstandingProjectRequest = createAction(
        "[Project] Patch Outstanding project",
        props<{ patchData: PatchFeature}>()
    );

    // Esta acción se despacha cuando el proyecto actualizado se obtienen correctamente
    export const patchOutstandingProjectSuccess = createAction(
        "[Project] Patch Outstanding project success",
        props<{ project: PatchProject }>()
    );

//Solicitud para actualizar los proyectos frecuentes en el localStorage
    // Esta acción se despacha cuando se seleccione un proyecto
    export const postFrequentProject = createAction(
        "[Project] Post Frequent Project",
        props<{ projectId: string }>()
    );

    // Esta acción se despacha cuando se obtiene la lista de ids de los proyetos recientes
    export const postFrequentProjectSuccess = createAction(
        "[Project] Post Frequent Project Success",
        props<{ projectIds: string[] }>()
    );

//Solicitud para actualizar un proyecto
    // Esta acción se despacha cuando se confirma la actualizacion del proyecto
    export const patchDataProject = createAction(
        "[Project] Patch project data",
        props<{projectId: number, project: ProjectCreate }>()
    )

    // Esta acción se despacha cuando se confirma la actualizacion del proyecto
    export const patchDataProjectSuccess = createAction(
        "[Project] Patch project data success",
        props<{projectCreated: ProjectCreateResponse}>()
    )

//Solicitud para crear un proyecto nuevo
    // Esta acción se despacha cuando se confirma la creacion de proyecto
    export const postCreateProject = createAction(
        "[Project] Post project creation",
        props<{ project: ProjectCreate }>()
    )

    // Esta acción se despacha cuando se confirma la creacion de proyecto
    export const postCreateProjectSuccess = createAction(
        "[Project] Post project creation success",
        props<{projectCreated: ProjectCreateResponse}>()
    )

// Esta acción se despacha si ocurre un error durante la solicitud
export const getProjectsFailure = createAction(
    "[Projects] Get Projects Failure",
    props<{ error: string }>()
);