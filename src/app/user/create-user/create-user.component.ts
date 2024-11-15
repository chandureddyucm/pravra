import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { baseResp } from 'src/models/baseResponse';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createUserForm: FormGroup;
  submitted = false;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      gender: ['Male', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.createUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.createUserForm.invalid) {
      return;
    }

    const userData = this.createUserForm.value;
    
    this.apiService.createUser(userData).subscribe(
      (resp: baseResp) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Something went wrong!';
      }
    );
  }
}
