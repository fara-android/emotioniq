import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonButton, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavbarService } from '../services/navbar-service.service';

register();

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonCol, IonRow, IonGrid, IonLabel, IonItem, IonButton, IonCardSubtitle, IonCardContent,
    IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
    IonCardTitle, CommonModule, RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage implements OnInit {
  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.navbarService.toggleNavbarVisibility(false);
    this.checkWelcomePageStatus();
  }

  async checkWelcomePageStatus() {
    const welcomePageClosed = await this.getWelcomePageStatus();
    if (welcomePageClosed) {
      this.navigateToHome();
    }
  }

  async closeWelcomePage() {
    await this.setWelcomePageStatus(true);
    this.navigateToHome();
  }

  async getWelcomePageStatus() {
    const { value } = await Storage.get({ key: 'welcomePageClosed' });
    return value === 'true';
  }

  async setWelcomePageStatus(closed: boolean) {
    await Storage.set({ key: 'welcomePageClosed', value: closed.toString() });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
