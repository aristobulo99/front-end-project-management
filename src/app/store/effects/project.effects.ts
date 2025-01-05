import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../core/services/project/project.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { deleteShareProjectRequest, deleteShareProjectSuccess, editShareProjectRequest, editShareProjectSuccess, getProjectsFailure, getProjectsIdRequest, getProjectsIdSuccess, getProjectsRequest, getProjectsSuccess, getProjectUsersRequest, getProjectUsersSuccess, patchDataProject, patchDataProjectSuccess, patchOutstandingProjectRequest, patchOutstandingProjectSuccess, postCreateProject, postCreateProjectSuccess, postFrequentProject, postFrequentProjectSuccess, postShareProjectRequest, postShareProjectSuccess } from "../actions/project.actions";
import { LoadingService } from "../../core/services/loading/loading.service";
import { HttpErrorResponse } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { ProjectUserService } from "../../core/services/project-user/project-user.service";

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private projectUserService: ProjectUserService,
        private toastService: ToastService,
        private loadingService: LoadingService,
        private store: Store
    ){}

    postCreateProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(postCreateProject),
            exhaustMap(
                (action) => this.projectService.postProject(action.project).pipe(
                    map(data => postCreateProjectSuccess({projectCreated: data})),
                    catchError(
                        (e) => {
                            let errorMessage: string = 'Se produjo un error inesperado.';
                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getProjectsFailure({ error: errorMessage }));
                        }
                    )
                )
            )
        )
    );

    
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

    getProjectId$ = createEffect(
        () => this.actions$.pipe(
            ofType(getProjectsIdRequest),
            exhaustMap(
                (action) => this.projectService.getProjectId(action.projectId).pipe(
                    map(result => getProjectsIdSuccess({project: result})),
                    catchError(
                        (error) => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'Project not found':
                                    errorMessage = 'El projecto no fue encontrado.';
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
    )

    getProjectUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(getProjectUsersRequest),
            exhaustMap(
                (action) => this.projectService.getProjectUsers(action.projectId).pipe(
                    map(result => getProjectUsersSuccess({projectUsers: result})),
                    catchError(
                        (error) => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'Project not found':
                                    errorMessage = 'El projecto no fue encontrado.';
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
    )

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

    patchDataProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(patchDataProject),
            exhaustMap(
                (action) => this.projectService.patchProject(action.projectId, action.project)
                    .pipe(
                        map((project) => patchDataProjectSuccess({projectCreated: project})),
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
    )

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

    postShareProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(postShareProjectRequest),
            exhaustMap(
                (action) => this.projectUserService.postShareProject(action.shared).pipe(
                    map(result => postShareProjectSuccess({projectUser: result})),
                    catchError(
                        (error) => {
                            let errorMessage: string;

                            switch (error.error) {
                                case 'The user is already added in the project':
                                    errorMessage = 'El usuario ya está agregado en el proyecto.';
                                    break;
                                case 'Control reserved for the admin':
                                        errorMessage = 'Control reservado para el administrador.';
                                        break;
                                case 'User not found':
                                        errorMessage = 'Usuario no encontrado.';
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

    deleteShareProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteShareProjectRequest),
            exhaustMap(
                (action) => this.projectUserService.deleteSharedProject(action.deleteShared).pipe(
                    map(() => deleteShareProjectSuccess({userId: action.deleteShared.userId})),
                    catchError((error) => {
                        let errorMessage: string;

                            switch (error.error) {
                                case 'The admin cannot be deleted':
                                    errorMessage = 'El administrador no puede ser eliminado.';
                                    break;
                                case 'Control reserved for the admin':
                                        errorMessage = 'Control reservado para el administrador.';
                                        break;
                                default:
                                    errorMessage = 'Se produjo un error inesperado.';
                            }

                            this.toastService.showInfo(errorMessage);
                            this.loadingService.activeLoading = false;
                            return of(getProjectsFailure({ error: errorMessage }));
                    })
                )
            )
        )
    );

    editionShareProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(editShareProjectRequest),
            exhaustMap((action) => this.projectUserService.editSharedProject(action.editShared).pipe(
                map((result) => editShareProjectSuccess({edition: {email: action.editShared.email, roleProject: result.roleProject}})),
                catchError((error) => {
                    let errorMessage: string;

                        switch (error.error) {
                            case 'User not found':
                                errorMessage = 'Usuario no encontrado.';
                                break;

                            case 'Project not found':
                                errorMessage = 'Proyecto no encontrado.';
                                break;
                            case 'Control reserved for the admin':
                                    errorMessage = 'Control reservado para el administrador.';
                                    break;
                            case 'There must be a project manager':
                                errorMessage = 'Debe haber un gerente de proyecto.';
                                break;
                            case 'User not related to the project':
                                errorMessage = 'Usuario no relacionado con el proyecto.';
                                break;
                            default:
                                errorMessage = 'Se produjo un error inesperado.';
                        }

                        this.toastService.showInfo(errorMessage);
                        this.loadingService.activeLoading = false;
                        return of(getProjectsFailure({ error: errorMessage }));
                })
            ))
        )
    );

}