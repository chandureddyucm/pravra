import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { baseResp, baseRespLogin, baseResponse } from 'src/models/baseResponse';
import { environment } from 'src/environments/environment';
import { gift } from 'src/models/gift';

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
}
