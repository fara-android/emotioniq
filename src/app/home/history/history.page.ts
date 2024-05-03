import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonSkeletonText, IonText, IonTabs, IonTabBar, IonTabButton, IonGrid, IonRow, IonCol, IonModal, IonItem, IonInput, IonList, IonAvatar, IonImg, IonLabel } from '@ionic/angular/standalone';
import { appBottomTabDirective } from '../../directives/bottom-tab.directive';
import { EmojiItemComponent } from '../../components/emoji-item/emoji-item.component';
import { Emojy } from '../home.page';
import { ModalController } from '@ionic/angular';
import { EmojiModalComponent } from '../../components/emoji-modal/emoji-modal.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonLabel, IonImg, IonAvatar, IonList, IonInput, IonItem, IonModal, EmojiItemComponent, EmojiModalComponent, appBottomTabDirective, IonCol, IonRow, IonGrid, IonTabButton, IonTabBar, IonTabs, IonText, IonSkeletonText, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {
  public activeAllEmojies: boolean = true;
  public activeEmojyId: number = 1;
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
  public isModalOpen: boolean = false;
  public activeFilter: string = 'week';
  public backgroundColor: string = '#FFFFFF !important';
  public emojy: Emojy = this.emojies[0];

  constructor(private m: ModalController) { }

  ngOnInit() {}

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getActiveEmojy(): Emojy | undefined {
    return this.emojies.filter(emojy => emojy.id === this.activeEmojyId)[0];
  }

  openModal(emoji: Emojy) {
    this.activeEmojyId = emoji.id;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
