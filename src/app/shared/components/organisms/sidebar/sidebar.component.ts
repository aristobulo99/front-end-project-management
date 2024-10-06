import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { Route, RouterModule } from '@angular/router';
import { IconComponent } from '../../atom/icon/icon.component';
import { NavigationRoute } from '../../../../core/interfaces/navigation.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconComponent,
    NgClass,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  routes: NavigationRoute[] = [];

  constructor(
    private navigation: NavigationService
  ){}

  ngOnInit(): void {
    this.routes = this.navigation.routes;
  }

  styleLi(select: boolean){
    return {
      'rounded-r-xl bg-gradient-to-r bg-opacity-80 from-pinkCustom to-blueCustom': select,
      'bg-white': !select
    }
  }

  styleText(select: boolean){
    return {
      'text-white': select,
      'text-black': !select
    }
  }

  selectRoute(i: number){
    this.routes.forEach(
      (route, index) => {
        route.select = i === index;
      }
    )
  }



}
