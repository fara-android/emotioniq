import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [IonApp, IonRouterOutlet, NavbarComponent, CommonModule],
})
export class AppComponent implements OnInit {
  public showNavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = this.isMainPageRoute(this.router.url);
      }
    });
  }

  isMainPageRoute(url: string): boolean {
    return !url.includes('/') || url === '/home' || url === '/analysis' || url === '/quiz' || url === '/settings';
  }
}
