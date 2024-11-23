import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { baseResp, baseResponse } from 'src/app/models/baseResponse';
import { contact } from 'src/app/models/contact';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  createSubscriptionForm: FormGroup;

  contactUsEmail: string = 'email@email.com';
  contactUsMobile: string = '9999999999';
  contactUsHelpEmail: string = 'email@email.com';
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  )   {
    this.getAllContacts();

    this.createSubscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.createSubscriptionForm.controls;
  }

  getAllContacts() {
    this.apiService.getAllContacts().subscribe(
      (resp: baseResponse<contact>) => {
        var obj = resp.data.filter((c) => c.tag === 'ContactUs');
        console.log(obj);
        this.contactUsEmail =
          obj?.find((c) => c.contacts.type === 'email')?.contacts.value ??
          this.contactUsEmail;
        this.contactUsMobile =
          obj?.find((c) => c.contacts.type === 'mobile')?.contacts.value ??
          this.contactUsMobile;
        this.contactUsHelpEmail =
          obj?.find((c) => c.contacts.type === 'help')?.contacts.value ??
          this.contactUsHelpEmail;
      },
      (error) => {}
    );
  }

  onSubmit() {
    if (this.createSubscriptionForm.invalid) {
      return;
    }
    const email = this.createSubscriptionForm.value.email;
    this.apiService.createSubscription(email).subscribe(
      (resp: baseResponse<boolean>) => {},
      (error) => {}
    );
    this.createSubscriptionForm.reset();
  }
}
