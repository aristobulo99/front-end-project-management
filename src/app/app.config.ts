import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/services/interceptor/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './store/app.state';
import { ProjectEffects } from './store/effects/project.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SprintEffects } from './store/effects/sprint.effects';
import { TaskEffects } from './store/effects/task.effects';
import { TaskWebSocketService } from './core/services/task/task-web-socket.service';
import { SocketIoModule } from 'ngx-socket-io';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore(ROOT_REDUCERS),
    provideEffects(ProjectEffects, SprintEffects, TaskEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),
  ]
};
