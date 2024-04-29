import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import { AuthModel } from '../models/authModel';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _auth:AuthService,
    private _toaster:NgToastService,
    private _cookie:CookieService,
    private _router:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  const token=this._auth.GetToken();
    if(token!=null){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      })
    } 
    
    
    return next.handle(request).pipe(
      catchError(( err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
             this._auth.RefreshToken().subscribe(data=>{
              this._auth.SetToken(data.token);
              this._auth.SetRefreshToken(data.refreshToken);
               request=request.clone({
                   setHeaders:{Authorization:`Bearer ${token}`}
                })
              this.intercept(request,next);
             })
          }
        }
        return throwError(()=>new Error("Some other error occured"));
      })
    );
  }

 
     
    
  
}
