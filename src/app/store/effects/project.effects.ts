import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../core/services/project/project.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { getProjectsFailure, getProjectsRequest, getProjectsSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess, postFrequentProject, postFrequentProjectSuccess } from "../actions/project.actions";
import { LoadingService } from "../../core/services/loading/loading.service";
import { HttpErrorResponse } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private toastService: ToastService,
        private loadingService: LoadingService,
        private store: Store
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

                            switch (error.error) {
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
                (action) => this.projectService.patchFeatureProject(action.patchData.id, action.patchData.feature).pipe(
                    map(data => patchOutstandingProjectSuccess({project: data})),
                    catchError(
                        (e) => {
                            let errorMessage: string;

                            switch (e.error) {
                                case 'User not related to the project':
                                    errorMessage = 'Usuario no relacionado con el proyecto';
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

    postFrequentProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(postFrequentProject),
            tap(({ projectId }) => {
                const storedIds = localStorage.getItem('frequent-project') || '';
                const projectIds = storedIds.split(',').filter(id => id !== '');

                if (!projectIds.includes(projectId)) {
                    projectIds.push(projectId);
                }

                localStorage.setItem('frequent-project', projectIds.join(','));

                this.store.dispatch(postFrequentProjectSuccess({ projectIds }));
            })
        ),
        { dispatch: false }
    );

}