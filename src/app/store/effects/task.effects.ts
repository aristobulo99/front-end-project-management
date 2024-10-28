import { Injectable } from "@angular/core";
import { TaskService } from "../../core/services/task/task.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastService } from "../../core/services/toastr/toast.service";
import { LoadingService } from "../../core/services/loading/loading.service";
import { getTaskBySprintIdRequest, getTaskBySprintIdSuccess, patchTaskStatusFailure, patchTaskStatusRequest, patchTaskStatusSuccess, postTaskRequest, postTaskSuccess, TaskFailure } from "../actions/task.actions";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class TaskEffects {

    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private toastService: ToastService,
        private loadingService: LoadingService,
    ){}

    getTaskBySprintId$ = createEffect(
        () => this.actions$.pipe(
            ofType(getTaskBySprintIdRequest),
            exhaustMap(
                (action) => this.taskService.getTaskBySprintId(action.sprintId)
                    .pipe(
                        map((result => getTaskBySprintIdSuccess({tasks: result}))),
                        catchError(error => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'Task not found':
                                    errorMessage = 'Tarea no encontrada.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(TaskFailure({error: errorMessage}))
                        })
                    )
            )
        )
    )

    postTask$ = createEffect(
        () => this.actions$.pipe(
            ofType(postTaskRequest),
            exhaustMap(
                (action) => this.taskService.postTask(action.taskData).pipe(
                    map(result => postTaskSuccess({task: result})),
                    catchError(error => {
                        let errorMessage: string;

                        switch (error.error) {
                            case 'Task not found':
                                errorMessage = 'Tarea no encontrada.';
                                break;
                            case 'Sprint not found':
                                errorMessage = 'Sprint no encontrada.';
                                break;
                            case 'No permissions to perform this action':
                                errorMessage = 'No hay permisos para realizar esta acción.';
                                break;
                            case 'User not related to the project':
                                errorMessage = 'Usuario no relacionado con el proyecto.';
                                break;
                            default:
                                errorMessage = 'Se produjo un error inesperado.';
                        }

                        this.toastService.showInfo(errorMessage);
                        this.loadingService.activeLoading = false;
                        return of(TaskFailure({error: errorMessage}))
                    })
                )
            )
        )
    )

    patchTaskStatus$ = createEffect(
        () => this.actions$.pipe(
            ofType(patchTaskStatusRequest),
            exhaustMap(
                (action) => this.taskService.patchTaskStatus(action.transfer).pipe(
                    map(result => patchTaskStatusSuccess({task: {...result, id: action.transfer.taskId}})),
                    catchError(error => {
                        let errorMessage: string;
                        switch (error.error) {
                            case 'Task not found':
                                errorMessage = 'Tarea no encontrada.';
                                break;
                            case 'For assigned user only':
                                errorMessage = 'La tarea solo puede ser cambiada de estado si está asignada a usted.';
                                break;                                
                            default:
                                errorMessage = 'Se produjo un error inesperado.';
                        }

                        this.toastService.showInfo(errorMessage);
                        this.loadingService.activeLoading = false;
                        return of(patchTaskStatusFailure())
                    })
                )
            )
        )
    )

}