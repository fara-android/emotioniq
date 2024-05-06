import { Component, Input, OnInit } from '@angular/core';
import { questions } from 'src/app/quiz/data';
import { Hint, Question, QuizPage, quizResult } from 'src/app/quiz/quiz.page';
import { IonContent, IonIcon, IonText, IonImg, IonGrid, IonRow, IonCol, IonButton, IonSkeletonText, IonModal, IonItem, IonTextarea } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@capacitor/storage';
import { RouterLink } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar-service.service';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss'],
  standalone: true,
  imports: [RouterLink, IonTextarea, IonItem, IonModal, IonSkeletonText, IonButton, IonCol, IonRow, IonGrid, IonImg, IonText, IonIcon, IonContent, CommonModule, FormsModule],
})
export class QuizUserComponent implements OnInit {
  @Input() quizStarted: boolean = false;
  @Input() questions: Question[] = [];

  public timer: number = 10;
  private timerInterval: any;
  public isModalOpen = false;
  private questionTime: number = 1000;
  public consecutiveCorrectAnswers: number = 0;

  public hints: Hint[] = [];
  public hintsNumber: number = 2;
  public quizFinished: boolean = false;
  public hintIcon: string = "assets/quiz/help.png";

  public correctAnswers: number = 0;
  public currentAnswer: number = 1;
  public currentQuestion: Question = null!;
  public selectedAnswerIndex: number = -1;
  public currentQuestionIndex: number = 0;
  public answerButtonDisabled: boolean = false;

  constructor(
    public quizComponent: QuizPage,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.questions = questions;
    this.shuffleQuestions();
    this.getCurrentQuestion();
    this.initializeHints();
    this.generateChoices();
    this.startTimer();
  }

  private initializeHints() {
    this.hints = Array.from({ length: this.hintsNumber }, () => ({
      hintIconUnused: "assets/quiz/help.png",
      hintIconUsed: "assets/quiz/help_used.png",
      hintUsed: false,
    }));
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.nextQuestion();
      }
    }, this.questionTime);
  }

  private generateChoices() {
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const choices = [];

      choices.push(question.answer);

      const otherQuestions = this.questions.filter((q, index) => index !== i);
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * otherQuestions.length);
        choices.push(otherQuestions[randomIndex].answer);
        otherQuestions.splice(randomIndex, 1); // Remove the chosen question to avoid duplicates
      }

      this.shuffleArray(choices);

      question.choices = choices;
    }
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private shuffleQuestions(): void {
    this.shuffleArray(this.questions);
  }

  public answer(choiceIndex: number) {
    this.selectedAnswerIndex = choiceIndex;

    this.questions[this.currentQuestionIndex].choices.forEach(choice => {
      this.questions[this.currentQuestionIndex].feedbackIcon = null!;
    });
  }

  public submitAnswer() {
    if (this.selectedAnswerIndex === -1) {
      return;
    }

    if (this.selectedAnswerIndex !== -1) {
      this.answerButtonDisabled = true;

      const selectedChoice = this.questions[this.currentQuestionIndex].choices[this.selectedAnswerIndex];

      const correctAnswer = this.questions[this.currentQuestionIndex].answer;
      const isCorrectAnswer = selectedChoice === correctAnswer;

      if (isCorrectAnswer) {
        this.correctAnswers++;
        this.consecutiveCorrectAnswers++;
        this.questions[this.currentQuestionIndex].feedbackIcon = "assets/quiz/correct_answer.svg";
      } else {
        this.consecutiveCorrectAnswers = 0;
        this.questions[this.currentQuestionIndex].feedbackIcon = "assets/quiz/wrong_answer.svg";
      }

      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }
  }

  private async nextQuestion() {
    clearInterval(this.timerInterval);

    // Check if it's the end of the game
    if (this.currentQuestionIndex === this.questions.length - 1) {
      const result: quizResult = {
        date: new Date(),
        score: this.correctAnswers,
        rewardScore: this.consecutiveCorrectAnswers
      };

      await this.setQuizResults(result);

      this.quizFinished = true;

      this.navbarService.toggleNavbarVisibility(true);
    }

    if (this.currentQuestionIndex + 1 < this.questions.length) {
      this.currentQuestionIndex++;
      this.timer = 10;
      this.startTimer();
      this.selectedAnswerIndex = -1;
      this.getCurrentQuestion();
      this.answerButtonDisabled = false;
    }
  }

  private getCurrentQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  public useHint(index: number) {
    const getHint: Hint = this.hints[index];

    if (getHint.hintUsed) return;

    if (!this.questions[this.currentQuestionIndex].hintUsed) {
      this.hints[index].hintUsed = true;

      this.questions[this.currentQuestionIndex].hintUsed = true;

      const correctAnswerIndex = this.questions[this.currentQuestionIndex].choices.findIndex(choice => choice === this.questions[this.currentQuestionIndex].answer);
      if (correctAnswerIndex !== -1) {
        this.selectedAnswerIndex = correctAnswerIndex;
        this.questions[this.currentQuestionIndex].feedbackIcon = "assets/quiz/hint_answer.svg";
      }
    }
  }

  public getTimerGradient(): string {
    const percentage = ((10 - this.timer) / 10) * 100;
    return `conic-gradient(#00C2FF40 ${percentage}%, 0, #00C2FF)`;
  }

  private async setQuizResults(result: quizResult): Promise<void> {
    let quizResults: quizResult[] = [];

    const { value } = await Storage.get({ key: 'quizResults' });

    if (value) {
      quizResults = JSON.parse(value);
    }

    quizResults.push(result);

    await Storage.set({ key: 'quizResults', value: JSON.stringify(quizResults) });
  }
  
  public getReward(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public resetQuiz() {
    this.isModalOpen = false;
    this.quizComponent.quizStarted = false
  }
}
