import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent, 
      children: [
        { path: 'project', component: ProjectsComponent },
        { path: '', redirectTo: 'project', pathMatch: 'full' },
      ] 
    }
];

@NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)export class HomeRoutignModule { }