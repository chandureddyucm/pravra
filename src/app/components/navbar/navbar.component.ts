import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userName: string = 'user';
  isUser: boolean = false;

  constructor(private navbarService: NavbarService, private sweetAlertService: SweetAlertService) {}

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    //this.sweetAlertService.showSuccessToast("User Logged Out Successfully");
    this.navbarService.userLogin(false);
  }

  editProfile(){

  }

  settings(){
    
  }

  ngOnInit(): void {
    this.navbarService.isUser$.subscribe((isUser) => {
      this.isUser = isUser;
      this.userName = localStorage.getItem('userName') ?? 'user';
    });
  }
}
