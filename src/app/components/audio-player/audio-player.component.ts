import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonInput, IonRange, IonLabel, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  imports: [IonIcon, IonLabel, IonRange, CommonModule, FormsModule, IonInput],
  standalone: true
})
export class AudioPlayerComponent implements OnDestroy {
  @Input() src!: any;
  public audio: HTMLAudioElement;

  private step: number = 15;
  private currentTime: number = 0;
  private pausedTime: number = 0;
  private isPlaying: boolean = false;

  constructor(
    private toastCtrl: ToastController
  ) {
    this.audio = new Audio();
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
    });
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
  }

  play() {
    if (this.pausedTime !== 0) {
      this.audio.currentTime = this.pausedTime;
    } else {
      this.audio.src = this.src;
    }
    this.audio.play();
    this.showToast(`Track played at ${this.formatTime(this.audio.currentTime)}`);
  }

  pause() {
    this.pausedTime = this.audio.currentTime;
    this.audio.pause();
    this.showToast(`Track paused at ${this.formatTime(this.audio.currentTime)}`);
  }

  next() {
    this.audio.currentTime += this.step;
    this.showToast(`Went forward ${this.step} seconds`);
  }
  
  prev() {
    this.audio.currentTime -= this.step;
    this.showToast(`Went back ${this.step} seconds`);
  }

  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  seek(event: CustomEvent) {
    console.log(event.detail.value);
    this.audio.currentTime = event.detail.value;
  }

  pad(val: number): string {
    return val < 10 ? '0' + val : val.toString();
  }

  showToast(message: string) {
    this.toastCtrl
    .create({
      message: message,
      duration: 2000
    })
    .then(toastEl => toastEl.present());
  }
}
