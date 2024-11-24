import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { baseResp, baseRespLogin, baseResponse } from 'src/app/models/baseResponse';
import { environment } from 'src/environments/environment';
import { addGift, gift } from 'src/app/models/gift';
import { contact } from '../models/contact';
import { appUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //#region User
  createUser(body: any) {
    return this.http.post<baseResp>(`${this.baseUrl}/user/createuser`, body);
  }

  login(email: string, password: string) {
    return this.http.get<baseRespLogin>(
      `${this.baseUrl}/user/login?email=${email}&password=${password}`
    );
  }

  getuserbyuserid() {
    return this.http.get<baseResp>(`${this.baseUrl}/user/getuserbyuserid`);
  }
  //#endregion

  //#region gifts
  getAllGifts() {
    return this.http.get<baseResponse<gift>>(
      `${this.baseUrl}/gifts/getAllGifts`
    );
  }

  addGift(body: any) {
    return this.http.post<baseResponse<gift>>(
      `${this.baseUrl}/gifts/addGift`, body
    );
  }

  updateGift(body: any, giftId: string) {
    return this.http.put<baseResponse<gift>>(
      `${this.baseUrl}/gifts/updateGift/${giftId}`, body
    );
  }

  getProductsByFilter(
    category: string,
    subcategory: string,
    minPrice: number,
    maxPrice: number
  ) {
    let url = `${this.baseUrl}/gifts/filter?`;

    const params: string[] = [];

    if (category) {
      params.push(`category=${category}`);
    }

    if (subcategory) {
      params.push(`subcategory=${subcategory}`);
    }

    if (minPrice > 0) {
      params.push(`minPrice=${minPrice}`);
    }

    if (maxPrice > 0) {
      params.push(`maxPrice=${maxPrice}`);
    }

    // Append the query parameters to the URL
    url += params.join('&');

    return this.http.get<baseResponse<gift>>(url);
  }

  //#endregion

  //#region contacts
  getAllContacts() {
    return this.http.get<baseResponse<contact>>(
      `${this.baseUrl}/contacts`
    );
  }
  //#endregion

  //#region subscription
  createSubscription(email: string) {
    return this.http.put<baseResp>(`${this.baseUrl}/user/addSubscription?email=${email}`,{});
  }
  //#endregion
}
