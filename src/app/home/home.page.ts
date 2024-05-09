import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSkeletonText, IonText, IonButton, IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';

import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmojiItemComponent } from '../components/emoji-item/emoji-item.component';
import { ModalController } from '@ionic/angular';
import { tracks } from './player/data';
import { Track } from './player/player.page';
import { emojies } from './data';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { v4 as uuidv4 } from 'uuid';
import { NavbarService } from '../services/navbar-service.service';
import { Emoji, Task } from './types';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModalController],
  imports: [
    RouterLink, IonFab, IonFabButton, IonIcon, IonButton, IonText,
    IonSkeletonText, IonCol, IonRow, IonGrid, IonHeader,
    IonToolbar, IonTitle, IonContent, NavbarComponent, CommonModule, EmojiItemComponent
  ],
})
export class HomePage implements OnInit {
  public emojies: Emoji[] = emojies;
  public tracks: Track[] = tracks;
  private tasks: Task[] = [];

  activeEmojiId = 2;
  userInput: string = '';
  userInputDefault: string = 'How was your day?';
  dtime_now: Date = new Date;
  taskSaved: boolean = false;
  highlightedViewShown = false;
  isModalOpen = false;
  activeEmoji: Emoji | undefined;

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private navbarService: NavbarService
  ) { }
  ngOnInit() {
    this.navbarService.toggleNavbarVisibility(true);
    this.loadTasks();
  }

  public async addTask() {
    const emoji = this.getActiveEmoji();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.userInput === '') return;

    const todayTasksExist = this.getAllTasks(today);

    if (todayTasksExist.length) {
      this.presentToast('You can only add one task per day.');
      return;
    }

    if (emoji?.is_primary) {
      this.presentToast('This emoji is only for primary accounts. Please select another one.');
      return;
    }

    this.saveTask(emoji!);
  }

  private async saveTask(emoji: Emoji) {
    const task = {
      id: uuidv4(),
      text: this.userInput,
      emoji: emoji,
      date: new Date()
    } as Task;

    this.taskSaved = true;
    this.tasks.push(task);
    await this.setTasks(this.tasks);
  }

  private async loadTasks() {
    const tasks = await this.getTasks();
    if (tasks) this.tasks = tasks;
  }

  private async setTasks(tasks: Task[]) {
    const serializedTasks = JSON.stringify(tasks);
    await Storage.set({ key: 'userTasks', value: serializedTasks });
  }

  private async getTasks(): Promise<Task[]> {
    const { value } = await Storage.get({ key: 'userTasks' });
    return value ? JSON.parse(value) : [];
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public async closeModal() {
    this.isModalOpen = false;
    await this.modalController.dismiss();
  }

  private getAllTasks(date: Date): Task[] {
    const filteredTasks = this.tasks.filter((task: Task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === date.getTime();
    });
  
    return filteredTasks;
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public slideChange($event: CustomEvent<[swiper: Swiper]>) {
    const swiper = $event.detail[0];
    this.activeEmojiId = swiper.activeIndex;
    this.activeEmoji = this.emojies[this.activeEmojiId];
  }

  public setActiveIndex(index: number) {
    this.activeEmojiId = index;
  }

  private getActiveEmoji(): Emoji | undefined {
    return this.emojies.find(emojy => emojy.id === this.activeEmojiId);
  }

  public commitUserInput(event: any): void {
    this.userInput = event.detail.value;
  }
}
