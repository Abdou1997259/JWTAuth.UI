import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { filter, from, of } from 'rxjs';
import { AuthModel } from 'src/app/models/authModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type:string="password"
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  loginFrom!:FormGroup ;
  display:string='none';
  forgetModel:any;
  constructor(
    private fb:FormBuilder,
    private _router:Router,
    private _auth:AuthService,
    private _toaster:NgToastService,
   private _cookie:CookieService
    )
  {

  }
  ngOnInit(): void {
   this.loginFrom=this.fb.group(
   {
    username:['',Validators.required],
    password:['',Validators.required]
   }
   

   )
  
  }
  getModal()
  {
    this.display='block'
  }
  
  hideShowPass()
  {
    
    debugger
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text":this.type="password";
    

    
  }
  OnSubmit(){
  
    if(this.loginFrom.valid)
    {
      var formData=new FormData()
      formData.append('username',this.loginFrom.value.username);
      formData.append('password',this.loginFrom.value.password);
      
      this._auth.LogIn(formData).subscribe({
        next:(res:HttpResponse<any>)=>{
         
       
       debugger
        
          
       
          var result= res.body as AuthModel ;
          this._auth.SetRefreshToken(result.refreshToken as string)
          this._auth.SetToken(result.token )
          this._auth.SaveUserData(result.userName);
          this._toaster.success({detail:'SUCCESS',summary:result.message,duration:4000});
          var RefreshToken=this._auth.GetRefreshToken()
          console.log(RefreshToken)
          this._router.navigate(['dashboard']);
          
        },
        error:(err)=>{
          debugger
          this._toaster.error({detail:'ERROR',summary:err.message,duration:4000});
          console.log(err);
        }
      })
       
    }
    else
    {
     // throw an error
     this.validateAllFromField(this.loginFrom);
    }
  }
  private validateAllFromField(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup)
      {
        this.validateAllFromField(formGroup);

      }
    })
  }
}
