import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SprintService } from "../../core/services/sprint/sprint.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { LoadingService } from "../../core/services/loading/loading.service";
import { Store } from "@ngrx/store";
import { deleteSprintRequest, deleteSprintSuccesus, getSprintFailure, getSprintIdRequest, getSprintIdSuccess, getSprintRequest, getSprintSuccess, pacthSprintRequest, pacthSprintStatusRequest, pacthSprintSuccess, postSprintRequest, postSprintSuccess } from "../actions/sprint.actions";
import {  catchError, exhaustMap, map, of } from "rxjs";


@Injectable()
export class SprintEffects {

    constructor(
        private actions$: Actions,
        private sprintService: SprintService,
        private toastService: ToastService,
        private loadingService: LoadingService,
    ){}

    postCreateSprint$ = createEffect(
        () => this.actions$.pipe(
            ofType(postSprintRequest),
            exhaustMap(
                (action) => this.sprintService.postSprint(action.sprint)
                    .pipe(
                        map((result) => postSprintSuccess({sprint: result})),
                        catchError((error) => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'No permissions to perform this action':
                                    errorMessage = 'El usuario no tiene permiso para esta acción.';
                                    break;
                                case 'Project not found':
                                    errorMessage = 'El proyecto no existe.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                        })
                    )
            )
        )
    )

    getAllProjectSprints$ = createEffect(
        () => this.actions$.pipe(
            ofType(getSprintRequest),
            exhaustMap(
                (action) => this.sprintService.getAllProjectSprint(action.projectId)
                    .pipe(
                        map((result) => getSprintSuccess({sprints: result})),
                        catchError((error) => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'User not found':
                                    errorMessage = 'El usuario no existe.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                        })
                    )
            )
        )
    )

    getSprintId$ = createEffect(
        () => this.actions$.pipe(
            ofType(getSprintIdRequest),
            exhaustMap(
                (action) => this.sprintService.getSprintId(action.sprintId)
                    .pipe(
                        map((result) => getSprintIdSuccess({sprint: result})),
                        catchError(
                            error => {
                                let errorMessage: string;

                            switch (error.error) {
                                case 'Sprint not found':
                                    errorMessage = 'Sprint no encontrado.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                            }
                        )
                    )
            )
        )
    )

    patchDataSprint$ = createEffect(
        () => this.actions$.pipe(
            ofType(pacthSprintRequest),
            exhaustMap(
                (action) => this.sprintService.patchSprint(action.sprintId, action.sprint)
                    .pipe(
                        map((result) => pacthSprintSuccess({sprint: result})),
                        catchError(
                            error => {
                                let errorMessage: string;

                            switch (error.error) {
                                case 'No permissions to perform this action':
                                    errorMessage = 'No hay permisos para realizar esta acción.';
                                    break;
                                case 'Sprint not found':
                                    errorMessage = 'Sprint no encontrado.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                            }
                        )
                    )
            )

        )
    );

    patchDataSprintStatus$ = createEffect(
        () => this.actions$.pipe(
            ofType(pacthSprintStatusRequest),
            exhaustMap(
                (action) => this.sprintService.patchSprintStatus(action.sprintId, action.status)
                    .pipe(
                        map((result) => pacthSprintSuccess({sprint: result})),
                        catchError(
                            error => {
                                let errorMessage: string;

                            switch (error.error) {
                                case 'No permissions to perform this action':
                                    errorMessage = 'No hay permisos para realizar esta acción.';
                                    break;
                                case 'Sprint not found':
                                    errorMessage = 'Sprint no encontrado.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                            }
                        )
                    )
            )

        )
    );

    deleteSprint$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteSprintRequest),
            exhaustMap(
                (action) => this.sprintService.deleteSprintRequest(action.sprintId)
                    .pipe(
                        map(() => deleteSprintSuccesus({sprintId: action.sprintId})),
                        catchError(
                            error => {
                                let errorMessage: string;

                            switch (error.error) {
                                case 'Sprint not found':
                                    errorMessage = 'Sprint no encontrada';
                                    break;
                                case 'Control reserved for the admin':
                                    errorMessage = 'Control reservado para el administrador.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getSprintFailure({ error: errorMessage }));
                            }
                        )
                    )
            )
        )
    );
}