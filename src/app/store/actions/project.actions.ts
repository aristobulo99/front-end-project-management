import { createAction, props } from "@ngrx/store";
import { PatchDataOutstanding, Project, ProjectCreate } from "../../core/interfaces/project.interface";

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

//Solicitud para actualizar el estado destacado
    // Accion para inicial la actualizacion del estado
    export const patchOutstandingProjectRequest = createAction(
        "[Project] Patch Outstanding project",
        props<{ patchData: PatchDataOutstanding}>()
    );

    // Esta acción se despacha cuando el proyecto actualizado se obtienen correctamente
    export const patchOutstandingProjectSuccess = createAction(
        "[Project] Patch Outstanding project success",
        props<{ project: ProjectCreate }>()
    );

// Esta acción se despacha si ocurre un error durante la solicitud
export const getProjectsFailure = createAction(
    "[Projects] Get Projects Failure",
    props<{ error: string }>()
);