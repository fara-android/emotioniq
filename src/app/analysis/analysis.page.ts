import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonButton, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';
import { videos, articles } from './data';
import { RouterLink } from '@angular/router';

export interface Article {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface Video {
  id: number;
  image: string;
  title?: string;
  url: string;
}

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
  standalone: true,
  imports: [RouterLink, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonButton, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class AnalysisPage implements OnInit {

  public videos: Video[] = videos;
  public articles: Article[] = articles;
  public activeFilter: string = 'articles';

  constructor() { }

  ngOnInit() { }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

}
