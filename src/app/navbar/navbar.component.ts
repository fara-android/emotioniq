import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonTabBar, IonTabs, IonIcon, IonTabButton, IonList, IonItem, IonLabel, IonRouterOutlet, IonContent } from "@ionic/angular/standalone";
import { appBottomTabDirective } from '../directives/bottom-tab.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonRouterOutlet, CommonModule, appBottomTabDirective, IonLabel, IonItem, IonList, IonTabButton, IonIcon, IonTabs, IonTabBar]
})
export class NavbarComponent implements OnInit  {
  public backgroundColor: string = '#00C2FF';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
