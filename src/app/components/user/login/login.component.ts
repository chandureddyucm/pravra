import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { baseRespLogin } from 'src/app/models/baseResponse';
import { appUser } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private navbarService: NavbarService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.apiService.login(loginData.email, loginData.password).subscribe(
      (response: baseRespLogin) => {
        localStorage.setItem('token', response.bearerToken);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('isAdmin', response.data.isAdmin.toString());
        localStorage.setItem('userName', `${response.data.firstName[0]} ${response.data.lastName[0]}`);
        this.navbarService.userLogin(true);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Invalid email or password';
      }
    );
  }
}