import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingModule } from '@dchtools/ngx-loading-v18';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end-project-management';

  constructor(
    private loadingService: LoadingService
  ){}

  get activeLoading(){
    return this.loadingService.activeLoading;
  }
}
