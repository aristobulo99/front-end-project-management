import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { UserService } from '../../../../core/services/user/user.service';
import { UserCreate } from '../../../../core/interfaces/user.interface';
import { HeaderService } from '../../../../core/services/header/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconComponent,
    ProfileIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public userData: UserCreate | undefined = undefined;

  constructor(
    private userService: UserService,
    private headerService: HeaderService
  ){}

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData(){
    this.userData = await this.userService.getUser();
    this.userService.userData = this.userData;
  }

  selectMenu(){
    this.headerService.sidebarDeployment = !this.headerService.sidebarDeployment; 
  }


}
