import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { NgModule } from "@angular/core";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { SprintTaskComponent } from "./components/sprint-task/sprint-task.component";
import { loadProjectUsersGuard, loadProjectUsersGuardDeactivate } from "../../core/guard/load-project-users-guard/load-project-users-guard.guard";


const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent, 
      children: [
        { path: '', component: ProjectsComponent },
        { path: 'details/:id', component: ProjectDetailsComponent, canActivate: [loadProjectUsersGuard], canDeactivate: [loadProjectUsersGuardDeactivate] },
        { path: 'details/:id/sprint/:sprintId', component: SprintTaskComponent, canActivate: [loadProjectUsersGuard], canDeactivate: [loadProjectUsersGuardDeactivate] },
        { path: '', redirectTo: '', pathMatch: 'full' },
      ] 
    }
];

@NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)export class HomeRoutignModule { }