import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonText } from "@ionic/angular/standalone";
import { Emojy } from 'src/app/home/home.page';

@Component({
  selector: 'app-emoji-item',
  templateUrl: './emoji-item.component.html',
  styleUrls: ['./emoji-item.component.scss'],
  standalone: true,
  imports: [IonText, CommonModule]
})
export class EmojiItemComponent {
  @Input() emojy!: Emojy;
  @Input() activeAllEmojies!: boolean;
  @Input() activeEmojyId!: number;
  @Input() smallTitle!: boolean;

  constructor() {
  }
}
