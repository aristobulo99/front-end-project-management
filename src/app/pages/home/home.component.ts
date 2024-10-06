import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/atom/button/button.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import { SidebarComponent } from '../../shared/components/organisms/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
  ){}

  logout(){
    this.loadingService.activeLoading = true;
    setTimeout(
      () => {
        this.authService.logout();
        this.loadingService.activeLoading = false;
      }, 2000
    )

  }

}
