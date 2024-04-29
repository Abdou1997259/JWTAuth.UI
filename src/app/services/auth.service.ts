import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthModel } from '../models/authModel';
import { RefreshTokenModel } from '../models/refreshModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string=environment.apiUrl;
  constructor(
    private _Http:HttpClient,
    private _router:Router,
     private _cookie:CookieService
    
    ) { }

  LogIn(formData:any):Observable<HttpResponse<any>>
  {
     
   
    const options = { 
      
      observe: 'response' as'response',
      responseType :'json' as 'json',
      withCredentials:true
  };
  
    return this._Http.post<any>(`${this.url}Auth/GetToken`,formData,options);
  }
  SignUp(formData:any):Observable<any>{
   return this._Http.post<any>(`${this.url}Auth/Register`,formData);
  }
  RefreshToken():Observable<any>
  {
    debugger
    let refreshToken:RefreshTokenModel={};
    
    refreshToken.RefreshToken=this._cookie.get("RefreshToken") 
   
   
    return this._Http.post<any>(`${this.url}Auth/RefreshToken`,refreshToken);
    
  }
  GetRefreshToken():any
  {
    return   this._cookie.get('RefreshToken')
  }
  SingOut()
  {
    localStorage.clear();
    this._router.navigate(['login']);
  }
  SetToken(token:string|undefined){
    if( typeof token !=undefined )
    {
      localStorage.setItem('Token',token as string );
    }
  
  }
  SetRefreshToken(RefreshToken:string)
  {
    
    this._cookie.set('RefreshToken',RefreshToken)
  }
  GetToken():string{
   return String(localStorage.getItem('Token'));
  }
  IsLoggin():boolean
  {
    var t=localStorage.getItem('Token')
    return !!t;
  }
  SaveUserData(username:string|undefined){
   if(typeof username != undefined)
   {
    localStorage.setItem('UserName',username as string)
   }
   
  }
  GetUserName():string
  {
    return String(localStorage.getItem('UserName'))
  }
}
