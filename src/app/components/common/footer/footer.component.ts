import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { baseResp, baseResponse } from 'src/app/models/baseResponse';
import { contact } from 'src/app/models/contact';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  contactUsEmail: string = "email@email.com";
  contactUsMobile: string = "9999999999";
  contactUsHelpEmail: string = "email@email.com";
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getAllContacts();
  }

  getAllContacts(){
    this.apiService.getAllContacts().subscribe(
      (resp: baseResponse<contact>) => {
        var obj = resp.data.filter(c => c.tag === "ContactUs");
        console.log(obj);
        this.contactUsEmail = obj?.find(c=>c.contacts.type === "email")?.contacts.value ?? this.contactUsEmail;
        this.contactUsMobile = obj?.find(c=>c.contacts.type === "mobile")?.contacts.value ?? this.contactUsMobile;
        this.contactUsHelpEmail = obj?.find(c=>c.contacts.type === "help")?.contacts.value ?? this.contactUsHelpEmail;

      },
      (error) => {
      }
    );
  }

}
