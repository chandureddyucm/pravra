import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public showNavbar$: Observable<boolean> = this.showNavbarSubject.asObservable();
  public isUser$: Observable<boolean> = this.isUserSubject.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor() { }

  setShowNavbar(value: boolean): void {
    this.showNavbarSubject.next(value);
  }

  userLogin(value: boolean): void{
    this.isUserSubject.next(value);
  }

  setAsAdmin(value: boolean): void{
    this.isAdminSubject.next(value);
  }
}