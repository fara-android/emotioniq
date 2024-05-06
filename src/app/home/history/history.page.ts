import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonSkeletonText, IonText, IonTabs, IonTabBar, IonTabButton, IonGrid, IonRow, IonCol, IonModal, IonItem, IonInput, IonList, IonAvatar, IonImg, IonLabel, IonTextarea } from '@ionic/angular/standalone';
import { appBottomTabDirective } from '../../directives/bottom-tab.directive';
import { EmojiItemComponent } from '../../components/emoji-item/emoji-item.component';
import { Emoji } from '../home.page';
import { ModalController } from '@ionic/angular';
import { EmojiModalComponent } from '../../components/emoji-modal/emoji-modal.component';
import { Storage } from '@capacitor/storage';
import { Task } from '../home.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonTextarea, IonLabel, IonImg, IonAvatar, IonList, IonInput, IonItem, IonModal, EmojiItemComponent, EmojiModalComponent, appBottomTabDirective, IonCol, IonRow, IonGrid, IonTabButton, IonTabBar, IonTabs, IonText, IonSkeletonText, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {
  public activeAllEmojies: boolean = true;
  public currentActiveTask: Task = null!;
  public isModalOpen: boolean = false;
  public activeFilter: string = 'week';
  public backgroundColor: string = '#FFFFFF !important';

  public tasks: Task[] = [];
  public mostUsedEmoji: Emoji = null!;
  public mostUsedEmojiAdvice: string = '';

  constructor(
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    const tasks = await this.getTasks();

    if (tasks) {
      this.tasks = tasks;
      this.updateMostUsedEmoji(); // Update most used emoji initially
    }

    // if (tasks) {
    //   this.tasks = tasks;

    //   // const emj = this.filterTasksByTimeframe(this.activeFilter)[0].emoji;
    //   // this.emoji = emj;
    //   // this.emojiAdvice = this.getEmojiRandomAdvice(emj);
    // }
  }

  public setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterTasksByTimeframe(filter);
    this.updateMostUsedEmoji();
  }

  public openModal(task: Task) {
    this.currentActiveTask = task;
    this.isModalOpen = true;
  }

  public async closeModal() {
    this.isModalOpen = false;
    await this.modalController.dismiss();
  }

  private async getTasks(): Promise<Task[]> {
    const { value } = await Storage.get({ key: 'userTasks' });
    const deserializedTasks: Task[] = JSON.parse(value!);
    return deserializedTasks;
  }

  private filterTasksByTimeframe(timeframe: string): Task[] {
    const now = new Date();
    let startDate = new Date();
    switch (timeframe) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        break;
    }

    const tasks = this.tasks.filter(task => {
      const taskDate = new Date(task.date);
      taskDate >= startDate;
    });

    return tasks;
  }

  private updateMostUsedEmoji() {
    const emojiCounts = new Map<number, number>(); // Map to store emoji counts

    this.tasks.forEach(task => {
      const emojiId = task.emoji.id;
      if (emojiCounts.has(emojiId)) {
        emojiCounts.set(emojiId, emojiCounts.get(emojiId)! + 1); // Increment count
      } else {
        emojiCounts.set(emojiId, 1); // Initialize count
      }
    });

    // Find the emoji with the highest count
    let maxCount = 0;
    let mostUsedEmojiId = 0;
    emojiCounts.forEach((count, emojiId) => {
      if (count > maxCount) {
        maxCount = count;
        mostUsedEmojiId = emojiId;
      }
    });

    // Find the emoji object with the most used emoji id
    this.mostUsedEmoji = this.tasks.find((task: Task) => task.emoji.id === mostUsedEmojiId)!.emoji;

    // Update most used emoji advice
    this.mostUsedEmojiAdvice = this.getEmojiRandomAdvice(this.mostUsedEmoji);
  }

  getEmojiRandomAdvice(emoji: Emoji): string {
    return emoji.advices ? emoji.advices[Math.floor(Math.random() * emoji.advices.length)] : '';
  }

}
