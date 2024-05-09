import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { videos } from '../data';
import { Video } from '../analysis.page';
// import { YoutubePlayer as YT } from 'capacitor-youtube-player'; // Web version
// import { Plugins, Capacitor } from '@capacitor/core'; // Native version
import { ShareOptions } from '@capacitor/share';
import { Share } from '@capacitor/share'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: true,
  imports: [RouterLink, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VideoPage implements OnInit {
  myId: string | null = null;
  video: Video | undefined;
  videos: Video[] = videos;
  videoUrl: SafeResourceUrl | undefined;
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('id');
    this.video = this.getVideo(+this.myId!);

    if (this.video && this.video.url) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
    }
  }

  getVideo(id: number) {
    return this.videos.find(video => video.id === id);
  }

  ngAfterViewInit() {
    // if (Capacitor.platform === 'web') {
    //   this.initializeYoutubePlayerPluginWeb();
    // } else { // Native
    //   this.initializeYoutubePlayerPluginNative();
    // }
  }

  // async initializeYoutubePlayerPluginWeb() {
  //   const options: any = { playerId: 'youtube-player', playerSize: { width: 640, height: '100%' }, videoId: this.getYoutubeVideoId() };
  //   const result = await YT.initialize(options);
  //   console.log('playerReady', result);
  // }

  // async destroyYoutubePlayerPluginWeb() {
  //   const result = await YT.destroy('youtube-player');
  // }

  // async initializeYoutubePlayerPluginNative() {
  //   const { YoutubePlayer } = Plugins;

  //   const options: any = { width: 640, height: '100%', videoId: this.getYoutubeVideoId() };
  //   const playerReady = await YT.initialize(options);
  // }

  getYoutubeVideoId(): string | null {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  
    const match = this.video?.url.match(regExp);
  
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  async shareVideo(video: Video) {
    const options : ShareOptions = {
      title: 'Share this video',
      text: video.title,
      url: video.url,
      dialogTitle: 'Share with buddies',
    };
  
    await Share.share(options);
  }
}
