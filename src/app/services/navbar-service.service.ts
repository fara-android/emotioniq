import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private _navbarVisibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Initialize to true
  public navbarVisibility: Observable<boolean> = this._navbarVisibility.asObservable();

  constructor() { }

  public toggleNavbarVisibility(isVisible: boolean): void {
    this._navbarVisibility.next(isVisible);
  }

}