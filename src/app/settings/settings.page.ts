import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonListHeader, IonIcon } from '@ionic/angular/standalone';
import { NavbarComponent } from '../navbar/navbar.component';
import { addIcons } from 'ionicons'
import { chevronForwardOutline } from 'ionicons/icons'
// import {
// 	GlassfySku
// } from 'capacitor-plugin-glassfy';
// import { ProductService } from '../services/premium.service';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonIcon, IonListHeader, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class SettingsPage implements OnInit {

  // private productService: ProductService
  constructor() { }

  ngOnInit() {
    addIcons({ chevronForwardOutline });
    // const offerings = this.productService.getOfferings();
    // const user = this.productService.user;

    // console.log(offerings);
    // console.log(user)
  }

	// public async purchase(sku: GlassfySku) {
	// 	await this.productService.purchase(sku);
	// }

	// public async restore() {
	// 	await this.productService.restore();
	// }

  public async openPrivacyPolicy() {
    await Browser.open({ url: environment.settingsUrls.privacy });
  }
  
  public async openTermsOfUse() {
    await Browser.open({ url: environment.settingsUrls.terms });
  }

  public async openSupportForm() {
    await Browser.open({ url: environment.settingsUrls.support });
  }

}
