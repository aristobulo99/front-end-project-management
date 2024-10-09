import { Component } from '@angular/core';
import { RegisterProjectFormComponent } from '../../../../shared/components/organisms/register-project-form/register-project-form.component';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { Router } from '@angular/router';
import { ProjectCreate } from '../../../../core/interfaces/project.interface';
import { ProjectService } from '../../../../core/services/project/project.service';
import { ToastService } from '../../../../core/services/toastr/toast.service';
import { LoadingService } from '../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-register-project',
  standalone: true,
  imports: [
    RegisterProjectFormComponent,
    IconComponent
  ],
  templateUrl: './register-project.component.html',
  styleUrl: './register-project.component.scss'
})
export class RegisterProjectComponent {

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastService: ToastService,
    private loading: LoadingService,
  ){}

  backProjects(){
    this.router.navigate(['/home/projects']);
  }

  async createProject(data: ProjectCreate){
    console.log(data);
    this.loading.activeLoading = true;
    try{
      await this.projectService.postProject(data);
    }catch(e: any){
      console.error('Error inesperado:', e);
        this.toastService.showError('Ocurrió un error inesperado. Intenta nuevamente.')
    }finally {
      this.loading.activeLoading = false;
      this.backProjects();
    }
  }

}
