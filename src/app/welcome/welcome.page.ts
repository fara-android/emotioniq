import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonButton, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { SwiperDirective } from '../directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';

register();

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonCol, IonRow, IonGrid, IonLabel, IonItem, IonButton, IonCardSubtitle, IonCardContent,
    IonCardHeader, IonContent,
    IonHeader, IonTitle, IonToolbar, IonCard,
    IonCardTitle,
    CommonModule,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage implements OnInit {
  @Input() config?: SwiperOptions;

  public swiperConfig: any = {
    slidesPerView: 3,
    initialSlide: 1,
    navigation: false,
    spaceBetween: 40,
    freeMode: true,
    watchSlidesProgress: true,
  };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
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
