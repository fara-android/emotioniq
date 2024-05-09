import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonBackButton, IonButtons, IonButton, IonItem, IonListHeader, IonList, IonGrid, IonRow, IonCol, IonImg, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { quizResult } from '../quiz.page';
import { Storage } from '@capacitor/storage';
import { userRewardsList } from './data';
import { questions } from '../data';
import { OrderBy } from 'src/app/pipes/orderby.pipe';

export interface Reward {
  description: string;
  image: string;
  score: number;
}

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
  standalone: true,
  imports: [OrderBy, IonLabel, IonImg, IonCol, IonRow, IonGrid, IonList, IonListHeader, RouterLink, IonItem, IonButton, IonButtons, IonBackButton, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RewardsPage implements OnInit {
  public rewards: quizResult[] = [];
  public userRewards: Reward[] = [];

  constructor() { }

  async ngOnInit() {
    if (this.rewards) {
      this.rewards = await this.getQuizResults();
      this.generateRewardList(this.rewards, userRewardsList);
    }
  }

  private async getQuizResults(): Promise<quizResult[]> {
    const { value } = await Storage.get({ key: 'quizResults' });
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  }

  private generateRewardList(userResults: quizResult[], rewards: Reward[]): void {
    userResults.forEach((result: quizResult) => {
      const userScore = result.rewardScore;
      if (userScore === 0) return
      if (
        userScore >= 25 && userScore < questions.length || 
        userScore === questions.length
      ) {
        const reward = rewards.find((reward: Reward) => reward.score === userScore);
        if (reward) {
          this.userRewards.push(reward);
        }
      }
    });
  }

}
