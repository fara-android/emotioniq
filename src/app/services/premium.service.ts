// import { environment } from './../../environments/environment';
// import { Injectable } from '@angular/core';
// import {
// 	Glassfy,
// 	GlassfyOffering,
// 	GlassfyPermission,
// 	GlassfySku,
// 	GlassfyTransaction
// } from 'capacitor-plugin-glassfy';
// import { BehaviorSubject } from 'rxjs';
// import { AlertController, ToastController } from '@ionic/angular';

// @Injectable({
// 	providedIn: 'root'
// })
// export class ProductService {
// 	// Init an "empty" user
// 	user = new BehaviorSubject({ gems: 0, skins: [], pro: false });

// 	private offerings: BehaviorSubject<GlassfyOffering[]> = new BehaviorSubject<GlassfyOffering[]>([]);

// 	constructor(private toastController: ToastController, private alertController: AlertController) {
// 		this.initGlassfy();
// 	}

// 	async initGlassfy() {
// 		try {
// 			// Initialise Glassfy
// 			await Glassfy.initialize({
// 				apiKey: environment.glassfyKey,
// 				watcherMode: false
// 			});

// 			// Get all user permissions
// 			const permissions = await Glassfy.permissions();
// 			this.handleExistingPermissions(permissions.all);

// 			// Get all offerings (products)
// 			const offerings = await Glassfy.offerings();
// 			this.offerings.next(offerings.all);
// 		} catch (e) {
// 			console.log('init error: ', e);
// 		}
// 	}

// 	async purchase(sku: GlassfySku) {
// 		// TODO
// 	}

// 	handleExistingPermissions(permissions: GlassfyPermission[]) {
// 		// TODO
// 	}

// 	async handleSuccessfulTransactionResult(transaction: GlassfyTransaction, sku: GlassfySku) {
// 		// TODO
// 	}

// 	// Helper functions
// 	getOfferings() {
// 		return this.offerings.asObservable();
// 	}

// 	async restore() {
// 		const permissions = await Glassfy.restorePurchases();
// 		// Handle those permissions!
// 	}
// }