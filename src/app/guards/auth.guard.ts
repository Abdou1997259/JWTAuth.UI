import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class AuthGurad implements CanActivate{
  constructor(
    private auth:AuthService,
    private _router:Router,
    private _toaster:NgToastService
    ){

  }
 canActivate(): boolean {

   if(this.auth.IsLoggin())
   {
     
     return true;
   }
   else
   {
   
    
    this._toaster.error({detail:"ERROR",summary:'Please Login First',duration:3000})
    this._router.navigate(['login']);
      return false;
   }

 }
}