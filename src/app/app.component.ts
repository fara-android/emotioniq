import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonItem, IonTabs, IonTabBar, IonTabButton, IonIcon, IonFooter, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonLabel, IonTitle, IonButton, IonButtons, IonToolbar, IonFooter, RouterLink, IonIcon, IonTabButton, IonTabBar, IonTabs, IonItem, IonContent, IonApp, IonRouterOutlet, NavbarComponent, CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  public showNavbar: boolean = false;
  private navbarVisibilitySubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.navbarVisibilitySubscription = this.navbarService.navbarVisibility.subscribe(isVisible => {
      this.showNavbar = isVisible;
      console.log(isVisible)
    });

  }

  ngOnDestroy(): void {
    if (this.navbarVisibilitySubscription) {
      this.navbarVisibilitySubscription.unsubscribe();
    }
  }

  welcomePage(): boolean {
    return this.router.url === '/';
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
