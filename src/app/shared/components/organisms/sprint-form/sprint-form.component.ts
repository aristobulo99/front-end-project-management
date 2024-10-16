import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegisterProjectFormComponent } from '../register-project-form/register-project-form.component';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { ProjectCreate } from '../../../../core/interfaces/project.interface';
import { CreateSprint } from '../../../../core/interfaces/sprint.interface';
import { DataSource } from '../../../../core/interfaces/table.interface';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [
    RegisterProjectFormComponent
  ],
  templateUrl: './sprint-form.component.html',
  styleUrl: './sprint-form.component.scss'
})
export class SprintFormComponent implements OnInit{

  @Input() editSprint: DataSource | undefined = undefined
  @Output() createEvent: EventEmitter<CreateSprint> = new EventEmitter();
  @Output() editEvent: EventEmitter<CreateSprint> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter(); 

  public dataProject: ProjectCreate | undefined = undefined;

  public formsInputs: InputControl[] = [
    {
      type: 'text',
      placeholder: 'Escriba nombre del Sprint',
      formInfo: {
        formName: 'name',
        validatorRequered: true
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de inicio',
      formInfo: {
        formName: 'startDate',
        validatorRequered: true
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de finalización',
      formInfo: {
        formName: 'endingDate',
        validatorRequered: true
      }
    },
    {
      type: 'text',
      textAre: true,
      placeholder: 'Escriba el objetivo del Sprint',
      formInfo: {
        formName: 'description',
        validatorRequered: true
      }
    },
  ]

  ngOnInit(): void {
    if(this.editSprint){
      this.dataProject = this.getProjectCreate();
    }
  }

  cancelProject(){
    this.cancelEvent.emit();
  }

  getProjectCreate():ProjectCreate{

    return {
      name: this.editSprint!['Nombre'] as string,
      description: this.editSprint!['aim'] as string,
      startDate: this.editSprint!['Fecha de inicio'] as Date,
      endingDate: this.editSprint!['Fecha de finalizacion'] as Date,
      outstanding: true,

    }
  }

  getCreateSprint(data: ProjectCreate):CreateSprint{
    return {
      aim: data.description,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endingDate,
      projectId: 0
    }
  }

  createSprint(data: ProjectCreate){
    const sprint = this.getCreateSprint(data);
    this.createEvent.emit(sprint);
  }

  editDataSprint(data: ProjectCreate){
    const sprint = this.getCreateSprint(data);
    this.editEvent.emit(sprint);
  }

}
