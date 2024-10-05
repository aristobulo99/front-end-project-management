import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/atom/button/button.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
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
