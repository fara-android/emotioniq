import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText, IonBackButton, IonButtons, IonGrid, IonRow, IonCol, IonImg, IonList, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { questions } from '../data';
import { Storage } from '@capacitor/storage';
import { quizResult, QuizUser } from '../quiz.page';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonImg, IonCol, IonRow, IonGrid, IonButtons, IonBackButton, RouterLink, IonText, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LeaderboardPage implements OnInit {

  public users: QuizUser[] = [];
  public myResult: QuizUser | undefined;
  public myPosition: number | undefined;
  public myQuizesults: quizResult[] = [];
  public highestUsersScore: QuizUser[] = [];
  public numberOfQuestions: number = questions.length;

  constructor() { }

  async ngOnInit() {
    this.generateRandomUsers(120);
    this.getTopThreeUsers();
    if (this.myQuizesults) this.myQuizesults = await this.getQuizResults();
    this.myResult = this.getMyResult();
    this.includeMyResult();
  }

  private async getQuizResults(): Promise<quizResult[]> {
    const { value } = await Storage.get({ key: 'quizResults' });
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  }

  private generateRandomUsers(count: number): void {
    for (let i = 1; i <= count; i++) {
      let score: number;
      if (i === count) {
        // If it's the last iteration, use your score
        score = this.myQuizesults[0]?.score || 0;
      } else {
        // Otherwise, generate a random score between 1 and 29
        score = Math.floor(Math.random() * this.numberOfQuestions) + 1;
      }
      if (score === 0) continue;
      const user: QuizUser = {
        name: `User ${i}`, // Truncate names after 10th user
        score: score,
      };
      this.users.push(user);
    }
  }

  private includeMyResult(): void {
    // TODO:
    // insert my result according to score in users array
    const myResult = this.getLatestNonZeroResult();
    if (myResult) {
      this.users.push({
        name: 'You',
        score: myResult!.score,
      });
    }
  }

  private getLatestNonZeroResult(): quizResult | undefined {
    const nonZeroResults = this.myQuizesults.filter(result => result.score !== 0);
    return nonZeroResults.length > 0 ? nonZeroResults[nonZeroResults.length - 1] : undefined;
  }

  private getTopThreeUsers() {
    const sortedUsers = this.users.sort((a, b) => b.score - a.score);
    const topThree = sortedUsers.slice(0, 3);
    this.highestUsersScore = topThree;
    // return topThree;
  }

  getChartClass(index: number): string {
    return index === 0 ? 'first_place_chart' : (index === 1 ? 'second_place_chart' : 'third_place_chart');
  }

  getRankId(index: number): string {
    return index === 0 ? 'first_place' : (index === 1 ? 'second_place' : 'third_place');
  }

  getRankIcon(index: number): string {
    return `assets/quiz/${index === 0 ? 'first' : (index === 1 ? 'second' : 'third')}_place.png`;
  }

  getMyResult(): QuizUser | undefined {
    const nonZeroResults = this.myQuizesults.filter(result => result.score !== 0);
    const sortedResults = nonZeroResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestResult = sortedResults[0];
    if (latestResult) {
      return {
        name: 'You',
        score: latestResult.score,
      };
    }
    return undefined;
  }

  getMyPosition(): number | undefined {
    return this.users.findIndex((user: QuizUser) => user.name === 'You');
  }

}
