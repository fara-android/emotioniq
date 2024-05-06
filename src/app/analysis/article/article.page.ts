import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonSkeletonText, IonText, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../analysis.page';
import { articles } from '../data';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [IonItem, IonText, IonSkeletonText, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink, FormsModule]
})
export class ArticlePage implements OnInit {
  myId: string | null = null;
  article: Article | undefined;
  articles : Article[] = articles;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('id');
    this.article = this.getArticle(+this.myId!);
  }

  getArticle(id: number) {
    return this.articles.find(article => article.id === id);
  }

}
