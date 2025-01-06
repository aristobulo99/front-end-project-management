import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTask, DetailedTask, Priority, Status, Task } from '../../../../core/interfaces/task.interface';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { InputComponent } from '../../atom/input/input.component';
import { OptionsKey, SelectComponent } from '../../molecules/select/select.component';
import { InputDateComponent } from '../../molecules/input-date/input-date.component';
import { TextAreaComponent } from '../../atom/text-area/text-area.component';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { TaskService } from '../../../../core/services/task/task.service';
import { ButtonComponent } from '../../atom/button/button.component';
import { ToastService } from '../../../../core/services/toastr/toast.service';
import { ProjectUsers } from '../../../../core/interfaces/project.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    InputDateComponent,
    TextAreaComponent,
    FormControlPipe,
    ButtonComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Input() taskStatus: Status | undefined = undefined;
  @Input() taskSPrintId: number | undefined = undefined;
  @Input() projectUsers: ProjectUsers[] = [];
  @Input() editingStatus: boolean = false;
  @Input() detailTask: DetailedTask | undefined = undefined;
  @Output() createEvent: EventEmitter<CreateTask> = new EventEmitter(); 
  @Output() editEvent: EventEmitter<Task> = new EventEmitter(); 
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter(); 

  public fgTask: FormGroup = new FormGroup({});
  public formsInputs: InputControl[] = [
    {
      type: 'text',
      placeholder: 'Escriba el titulo de la tarea',
      formInfo: {
        formName: 'title',
        validatorRequered: true
      }
    },
    {
      type: 'number',
      placeholder: 'Escriba los puntos de la historia',
      formInfo: {
        formName: 'storyPoints',
        validatorRequered: true
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de inicio',
      formInfo: {
        formName: 'initDate',
        validatorRequered: false
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de finalización',
      formInfo: {
        formName: 'endDate',
        validatorRequered: false
      }
    },
    {
      type: 'select',
      placeholder: 'Seleccione la prioridad',
      formInfo: {
        formName: 'priority',
        validatorRequered: true
      }
    }, 
    {
      type: 'select',
      placeholder: 'Seleccione el usuario asignado',
      formInfo: {
        formName: 'assignedUser',
        validatorRequered: true
      }
    }, 
    {
      type: 'text-area',
      placeholder: 'Escriba la descripción de la tarea',
      formInfo: {
        formName: 'description',
        validatorRequered: false
      }
    },
  
  ]
  public changesEditingForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.formsInputs[4].options = Object.values(this.taskService.priority);
    this.formsInputs[5].optionsKey = this.projectUsers.map(pu => ({label: pu.name, value: `${pu.id}`})) as OptionsKey[];
    this.initFormTask();
    this.changesThroughoutTheForm();
  }

  ngOnDestroy(): void {
    this.editingStatus = false;
    this.detailTask = undefined;
    this.fgTask.reset();
  }

  initFormTask(){
    this.fgTask = this.fb.group(
      {
        title: new FormControl<string>(this.detailTask?.title || '', [Validators.required]),
        description: new FormControl<string>(this.detailTask?.description || ''),
        priority: new FormControl<Priority | string>(this.taskService.priority[this.detailTask?.priority as Priority] || '', [Validators.required]),
        status: new FormControl<Status | string>(this.taskStatus ? this.taskStatus : '', [Validators.required]),
        storyPoints: new FormControl<number | undefined>(this.detailTask?.storyPoints || undefined),
        initDate: new FormControl<Date | string>(this.detailTask?.initDate || ''),
        endDate: new FormControl<Date | string>(this.detailTask?.endDate || ''),
        sprintId: new FormControl<number | string>(this.taskSPrintId ? this.taskSPrintId : this.detailTask?.sprintId || '', [Validators.required]),
        assignedUser: new FormControl<number | string>(this.detailTask?.assignedUser|| '', [Validators.required]),
      }
    );
  }

  changesThroughoutTheForm(){
    this.fgTask.valueChanges.subscribe(
      (value) => {
        if(!!value.initDate && !!value.endDate){
          if(value.initDate > value.endDate){
            this.toastService.showInfo(
              'La fecha de inicio debe ser inferior a la fecha de finalización', '', {timeOut: 10000}
            )
            this.fgTask.patchValue({
              endDate: '',
              initDate: ''
            }, { emitEvent: false });
          }
        }

        if (this.detailTask) {
          const isChanged = Object.keys(value).some((key) => {
            const formValue = value[key as keyof typeof value];
            const taskValue = key === 'priority' 
              ? this.taskService.priority[this.detailTask![key as keyof typeof this.detailTask] as Priority] 
              : this.detailTask![key as keyof typeof this.detailTask];
    
            return formValue?.toString() !== taskValue?.toString();
          });
          this.changesEditingForm = isChanged;
          if (!isChanged) {
            this.fgTask.setErrors({ noChanges: true });
          } else {
            this.fgTask.setErrors(null);
          }
        }
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.fgTask.get(field)?.valid || !this.fgTask.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.fgTask.get(field)?.touched &&  this.fgTask.get(field)?.hasError(errorCode)) as boolean
  }

  cancelProject(){
    this.cancelEvent.emit();
  }

  createTask(){
    const data: CreateTask = {
      title: this.fgTask.get('title')?.value,
      description: this.fgTask.get('description')?.value ? this.fgTask.get('description')?.value : undefined,
      priority: this.taskService.getPriorityKeyByValue(this.fgTask.get('priority')?.value) as Priority,
      status: this.fgTask.get('status')?.value,
      storyPoints: this.fgTask.get('storyPoints')?.value ? Number(this.fgTask.get('storyPoints')?.value) : undefined,
      initDate: this.fgTask.get('initDate')?.value ? this.fgTask.get('initDate')?.value : undefined,
      endDate: this.fgTask.get('endDate')?.value ? this.fgTask.get('endDate')?.value : undefined,
      sprintId: this.fgTask.get('sprintId')?.value,
      assignedUser: Number(this.fgTask.get('assignedUser')?.value),
    } 
    if(this.taskStatus && this.detailTask){
      this.editEvent.emit({id: this.detailTask.id ,...data});
    }else{
      this.createEvent.emit(data);
    }
  }

}
