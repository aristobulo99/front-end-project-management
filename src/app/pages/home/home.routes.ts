import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { NgModule } from "@angular/core";
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { SprintTaskComponent } from "./components/sprint-task/sprint-task.component";


const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent, 
      children: [
        { path: '', component: ProjectsComponent },
        { path: 'details/:id', component: ProjectDetailsComponent },
        { path: 'details/:id/sprint/:sprintId', component: SprintTaskComponent },
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