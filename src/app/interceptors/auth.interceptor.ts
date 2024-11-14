import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token = 'your_bearer_token_here'; // Replace this with your actual token logic

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`)
    });

    // Handle the request and check response for alert conditions
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Check for a specific field and display an alert
          if(event.body.bearerToken){
            //When user logs in bearertoken is taken from here and set to local storage as well as to private variable token that it uses in subsequent calls
            this.token = event.body.bearerToken;
            localStorage.setItem('token', event.body.bearerToken);
          }
          if (event.body && event.body.status && event.body.message) 
            alert(event.body.message);
          else if(event.body && !event.body.status && event.body.message)
            alert(event.body.message);
        }
      })
    );
  }
}
