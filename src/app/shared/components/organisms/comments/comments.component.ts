import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { Comments } from '../../../../core/interfaces/task.interface';
import { UserService } from '../../../../core/services/user/user.service';
import { FormControl } from '@angular/forms';
import { DescriptionActivityComponent } from '../../molecules/description-activity/description-activity.component';
import { CommentCreate } from '../../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    ProfileIconComponent,
    InputComponent,
    ButtonComponent,
    DescriptionActivityComponent
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  @Input() comments: Comments[] = [];
  @Input() taskId!: number;
  @Output() commentEvent: EventEmitter<CommentCreate> = new EventEmitter();

  public commentControl: FormControl = new FormControl('');

  constructor(
    private userService: UserService
  ){}

  getUserData(): string{
    return this.userService.userData.name
  }

  validateContent(): boolean {
    return (this.commentControl.value as string).trim() !== '';
  }

  confirmComment(){
    const comment: CommentCreate = {
      content: this.commentControl.value,
      creationDate: new Date(),
      taskId: this.taskId
    }
    this.commentEvent.emit(comment);
    this.commentControl.setValue('');
  }

}
