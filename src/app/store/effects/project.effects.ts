import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../core/services/project/project.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { getProjectsFailure, getProjectsRequest, getProjectsSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess } from "../actions/project.actions";
import { LoadingService } from "../../core/services/loading/loading.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private toastService: ToastService,
        private loadingService: LoadingService
    ){}

    
    getAllProjects$ = createEffect(
        () => this.actions$.pipe(
            ofType(getProjectsRequest),
            exhaustMap(
                () => this.projectService.getMyProjects().pipe(
                    map(myProjects => getProjectsSuccess({projects: myProjects})),
                    catchError(
                        (error) => {
                            let errorMessage: string;

                            switch (error.message) {
                                case 'User not found':
                                    errorMessage = 'El usuario no fue encontrado.';
                                    break;
                                case 'An error occurred while retrieving user project details':
                                    errorMessage = 'Ocurrió un error al recuperar los detalles del proyecto del usuario.';
                                    break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getProjectsFailure({ error: errorMessage }));
                        }
                    )
                )
            )
        )
    );

    patchOutstanding$ = createEffect(
        () => this.actions$.pipe(
            ofType(patchOutstandingProjectRequest),
            exhaustMap(
                (action) => this.projectService.patchProject(action.patchData.id, action.patchData.outstanding).pipe(
                    map(data => patchOutstandingProjectSuccess({project: data})),
                    catchError(
                        (error) => {
                            let errorMessage: string;

                            if(error instanceof HttpErrorResponse){
                                switch (error.message) {
                                    case 'Project not found':
                                        errorMessage = 'proyecto no encontrado';
                                        break;
                                    default:
                                        errorMessage = 'Se produjo un error inesperado.';
                                }
                                this.toastService.showInfo(errorMessage);
                            } else {
                                console.error('Error inesperado:', error);
                                errorMessage = 'Se produjo un error inesperado.';
                                this.toastService.showError('Ocurrió un error inesperado. Intenta nuevamente.');
                            }
                    
                            this.loadingService.activeLoading = false;
                            return of(getProjectsFailure({ error: errorMessage }));
                        }
                    )
                )
            )
        )
    )

}