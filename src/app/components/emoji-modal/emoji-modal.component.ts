import { ModalController, IonicModule } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/home/types';
import { CommonModule } from '@angular/common';
import { HistoryPage } from 'src/app/home/history/history.page';

@Component({
  selector: 'app-emoji-modal',
  templateUrl: './emoji-modal.component.html',
  styleUrls: ['./emoji-modal.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class EmojiModalComponent implements OnInit {
  @Input() task: Task | undefined;
  @Input() isModalOpen: boolean | undefined;

  ngOnInit() {}

  constructor(private m: HistoryPage) {}

  close() {
    this.m.isModalOpen = false;
  }

}
