import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonText, IonImg } from "@ionic/angular/standalone";
import { Emoji } from 'src/app/home/home.page';

@Component({
  selector: 'app-emoji-item',
  templateUrl: './emoji-item.component.html',
  styleUrls: ['./emoji-item.component.scss'],
  standalone: true,
  imports: [IonImg, IonText, CommonModule]
})
export class EmojiItemComponent {
  @Input() emojy!: Emoji;
  @Input() activeAllEmojies!: boolean;
  @Input() activeEmojiId!: number;
  @Input() smallTitle!: boolean;

  constructor() {
  }
}
