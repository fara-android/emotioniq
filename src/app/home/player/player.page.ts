import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRange, IonButtons, IonBackButton, IonIcon, IonButton, IonImg, IonItem, IonRow, IonCol, IonGrid, IonSkeletonText, IonText, IonFabButton, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { pImages, tracks } from './data';
import { Storage } from '@capacitor/storage';
import { Share, ShareOptions } from '@capacitor/share';

export interface Track {
  id: number;
  duration: string;
  name: string;
  url: string;
}

export interface PlayerImage {
  id: number;
  path: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: true,
  imports: [RouterLink, AudioPlayerComponent, IonRange, IonLabel, IonFabButton, IonText, IonSkeletonText, IonGrid, IonCol, IonRow, IonItem, IonImg, IonButton, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerPage implements OnInit {
  myId: string | null = null;
  track: Track | undefined;
  tracks : Track[] = tracks;
  defaultPlayerImageId: string = '1';
  playerImages: PlayerImage[] = pImages;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('id');
    this.track = this.getTrack(+this.myId!);
    this.checkPlayerDefaultImageId();
  }

  async checkPlayerDefaultImageId() {
    const defaultImageId = await this.getPlayerDefaultImageId();
    if (defaultImageId) this.defaultPlayerImageId = defaultImageId.toString();
  }

  getTrack(id: number) {
    return this.tracks.find(track => track.id === id);
  }

  async setBackground(id: number) {
    await this.setPlayerDefaultImageId(id);
    this.defaultPlayerImageId = id.toString();
  }

  async getPlayerDefaultImageId() {
    const { value } = await Storage.get({ key: 'playerDefaultImageId' });
    return value;
  }

  async setPlayerDefaultImageId(id: number) {
    await Storage.set({ key: 'playerDefaultImageId', value: id.toString() });
  }

  async shareTrack(track: Track) {
    const options: ShareOptions = {
      title: 'Listen to this cool track',
      text: track.name,
      url: track.url,
      dialogTitle: 'Share with buddies',
    };
  
    await Share.share(options);
  }

}
