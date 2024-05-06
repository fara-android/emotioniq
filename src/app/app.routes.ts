import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home/history',
    loadComponent: () => import('./home/history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'home/player/:id',
    loadComponent: () => import('./home/player/player.page').then( m => m.PlayerPage)
  },
  {
    path: 'analysis',
    loadComponent: () => import('./analysis/analysis.page').then( m => m.AnalysisPage)
  },
  {
    path: 'analysis/article/:id',
    loadComponent: () => import('./analysis/article/article.page').then( m => m.ArticlePage)
  },
  {
    path: 'analysis/video/:id',
    loadComponent: () => import('./analysis/video/video.page').then( m => m.VideoPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'quiz/rewards',
    loadComponent: () => import('./quiz/rewards/rewards.page').then( m => m.RewardsPage)
  },
  {
    path: 'quiz/leaderboard',
    loadComponent: () => import('./quiz/leaderboard/leaderboard.page').then( m => m.LeaderboardPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'webview',
    loadComponent: () => import('./settings/webview/webview.page').then( m => m.WebviewPage)
  },
];
