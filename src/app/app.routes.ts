import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'**',
        redirectTo: '/login'
    }
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports:[RouterModule]
    }
)
export class AppRoutingModule {}