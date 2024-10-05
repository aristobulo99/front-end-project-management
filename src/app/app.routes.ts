import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NonAuthGuard } from './core/guard/non-auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'**',
        redirectTo: '/login'
    }
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports:[RouterModule],
        providers: [AuthGuard, NonAuthGuard]
    }
)
export class AppRoutingModule {}