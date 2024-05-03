import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSkeletonText, IonText, IonButton, IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';

import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperDirective } from '../directives/swiper.directive';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmojiItemComponent } from '../components/emoji-item/emoji-item.component';
import { ModalController } from '@ionic/angular';

register();

export interface Emojy {
  id: number;
  name: string;
  img: string;
  is_primary: boolean;
}

interface Task {
  text: string;
  emojy: Emojy;
  date: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModalController],
  imports: [
    IonFab, IonFabButton, IonIcon, IonButton, IonText, 
    IonSkeletonText, IonCol, IonRow, IonGrid, IonHeader,
    IonToolbar, IonTitle, IonContent, NavbarComponent, CommonModule, SwiperDirective, EmojiItemComponent
  ],
})
export class HomePage {

  @Input() config?: SwiperOptions;
  @ViewChild('modal') modal!: HTMLIonModalElement;

  public swiperConfig: any = {
    slidesPerView: 3,
    initialSlide: 1,
    navigation: false,
    spaceBetween: 40,
    freeMode: true,
    watchSlidesProgress: true,
  };

  public emojies: Emojy[] = [
    {
      id: 1,
      name: "Satisfaction",
      img: "Frame9713.png",
      is_primary: false
    },
    {
      id: 2,
      name: "Fatigue",
      img: "Frame9712.png",
      is_primary: false
    },
    {
      id: 3,
      name: "Fun",
      img: "Frame9709.png",
      is_primary: false
    },
    {
      id: 4,
      name: "Sad",
      img: "Frame9711.png",
      is_primary: false
    }
  ]

  private tasks: Task[] = [];

  activeEmojyId = 2;

  userInput: string = '';
  userInputDefault: string = 'How was your day?';

  dtime_now: Date = new Date;
  
  taskSaved: boolean = false;
  highlightedViewShown = false;
  
  activeEmojy: Emojy | undefined;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  slideChange($event: CustomEvent<[swiper: Swiper]>) {
    const swiper = $event.detail[0];
    this.activeEmojyId = swiper.activeIndex;
    this.activeEmojy = this.emojies[this.activeEmojyId];
  }

  setActiveIndex(index: number) {
    this.activeEmojyId = index;
  }

  getActiveEmojy(): Emojy | undefined {
    return this.emojies.filter(emojy => emojy.id === this.activeEmojyId)[0];
  }

  saveTask() {
    if (this.userInput === '') return;

    this.taskSaved = true;

    const task = {
      text: this.userInput,
      emojy: this.getActiveEmojy(),
      date: new Date
    } as Task
    
    this.tasks.push(task);
    console.log(this.tasks);
  }

  commitUserInput(event: any): void {
    this.userInput = event.detail.value;
  }

  navigateTo(url: string) {
    this.router.navigate([`/home/${url}`]);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
