import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { baseRespLogin } from 'src/models/baseResponse';

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
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.apiService.login(loginData.email, loginData.password).subscribe(
      (response: baseRespLogin) => {
        localStorage.setItem('token', response.bearerToken);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Invalid email or password';
      }
    );
  }
}
