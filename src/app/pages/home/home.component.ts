import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/atom/button/button.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import { SidebarComponent } from '../../shared/components/organisms/sidebar/sidebar.component';
import { HeaderService } from '../../core/services/header/header.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private headerService: HeaderService,
  ){}

  get sidebarDeployment(){
    return this.headerService.sidebarDeployment
  }

}
