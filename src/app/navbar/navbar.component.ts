import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabBar, IonTabs, IonIcon, IonTabButton, IonList, IonItem, IonLabel, IonRouterOutlet } from "@ionic/angular/standalone";
import { appBottomTabDirective } from '../directives/bottom-tab.directive';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, CommonModule, appBottomTabDirective, IonLabel, IonItem, IonList, IonTabButton, IonIcon, IonTabs, IonTabBar]
})
export class NavbarComponent implements OnInit {
  public backgroundColor: string = '#00C2FF';

  constructor(
    private router: Router, 
    public appComponent: AppComponent
  ) { }

  ngOnInit() {}

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  welcomePage(): boolean {
    return this.router.url === '/';
  }
}
