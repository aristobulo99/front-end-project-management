import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SprintService } from "../../core/services/sprint/sprint.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { LoadingService } from "../../core/services/loading/loading.service";
import { Store } from "@ngrx/store";
import { getSprintFailure, getSprintRequest, getSprintSuccess, postSprintRequest, postSprintSuccess } from "../actions/sprint.actions";
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
}