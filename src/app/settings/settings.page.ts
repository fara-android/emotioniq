import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonListHeader, IonIcon } from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';
import { addIcons } from 'ionicons'
import { chevronForwardOutline } from 'ionicons/icons'

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [IonIcon, IonListHeader, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    addIcons({chevronForwardOutline})
  }

}
