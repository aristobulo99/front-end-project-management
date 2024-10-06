import { Component } from '@angular/core';
import { CardProjectComponent } from '../../../../shared/components/molecules/card-project/card-project.component';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { SectionProject } from '../../../../core/interfaces/project.interface';
import { mockProject } from '../../../../core/mocks/project.mock';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CardProjectComponent,
    IconComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  public listProjects: SectionProject[] = [
    {
      icon: 'star',
      title: 'Proyectos destacados',
      project: mockProject(0)
    },
    {
      icon: 'schedule',
      title: 'Vistos recientemente',
      project: mockProject(1)
    },
    {
      title: 'TUS PROYECTOS',
      project: mockProject(5)
    }
    
  ];

}
