import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { baseResp, baseRespLogin } from 'src/models/baseResponse';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //#region User
  createUser(body: any) {
    return this.http.post<baseResp>(`${this.baseUrl}/user/createuser`, body);
  }

  login(email:string, password:string){
    return this.http.get<baseRespLogin>(`${this.baseUrl}/user/login?email=${email}&password=${password}`);
  }
  //#endregion
}
