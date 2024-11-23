import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private navbarService: NavbarService, private sweetAlertService: SweetAlertService, private router: Router) {}

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    //this.sweetAlertService.showSuccessToast("User Logged Out Successfully");
    this.navbarService.userLogin(false);
    this.router.navigate(['/home']);
  }

  editProfile(){

  }

  settings(){
    
  }

  ngOnInit(): void {
    this.navbarService.isUser$.subscribe((isUser) => {
      this.isUser = localStorage.getItem('isLoggedIn') == "true" ? true : false;
      this.userName = localStorage.getItem('userName') ?? 'user';
    });
  }
}
