import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSkeletonText, IonText, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';
import { questions } from './data';
import { QuizUserComponent } from '../components/user-quiz/user-quiz.component';
import { NavbarService } from '../services/navbar-service.service';
import { RouterLink } from '@angular/router';

export interface Question {
  question: string;
  answer: string;
  image: string;
  choices: string[];
  feedbackIcon?: string;
  hintUsed?: boolean;
}

export interface Hint {
  hintIconUnused: string;
  hintIconUsed: string;
  hintUsed: boolean;
}

export interface quizResult {
  date: Date;
  score: number;
  rewardScore: number;
}

export interface QuizUser {
  name: string;
  score: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [RouterLink, QuizUserComponent, IonImg, IonIcon, IonButton, IonText, IonSkeletonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class QuizPage implements OnInit, OnDestroy {
  public quizStarted: boolean = false;
  public questsions: Question[] = questions;

  constructor(
    private navbarService: NavbarService
  ) { }

  ngOnDestroy(): void {
    this.quizStarted = false;
  }

  ngOnInit() {
  }

  startQuiz() {
    this.navbarService.toggleNavbarVisibility(false);
    this.quizStarted = true;
  }

}
