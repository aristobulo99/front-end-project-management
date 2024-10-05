import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingModule } from '@dchtools/ngx-loading-v18';
import { LoadingService } from './core/services/loading/loading.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/molecules/header/header.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NgxLoadingModule,
    ToastrModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-end-project-management';

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ){}

  get activeLoading(){
    return this.loadingService.activeLoading;
  }

  get isAuth(): boolean{
    return this.authService.isAuthenticated();
  }
}
