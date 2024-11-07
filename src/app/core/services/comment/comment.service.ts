import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentCreate } from '../../interfaces/comment.interface';
import { environment } from '../../../../environments/environment';
import { Comments } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  postComment(comment: CommentCreate){
    return this.http.post<Comments>(`${environment.apiUrl}/api/comment`, comment);
  }
}
