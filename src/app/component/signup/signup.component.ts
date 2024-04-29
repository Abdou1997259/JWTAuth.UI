import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type:string="password"
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signupForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private _router:Router,
    private auth:AuthService,
    private toaster:NgToastService
    ){

  }
  ngOnInit(): void { 
   this.signupForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    email:['',Validators.required]
   })
  
  }
  hideShowPass()
  {
    
    debugger
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text":this.type="password";
    

    
  }
  OnSubmit()
  {
    if(this.signupForm.valid)
    {
      var formData=new FormData();
      formData.append('username',this.signupForm.value.username);
      formData.append('firstname',this.signupForm.value.firstname);
      formData.append('lastname',this.signupForm.value.lastname);
      formData.append('email',this.signupForm.value.email);
      formData.append('password',this.signupForm.value.password);
      this.auth.SignUp(formData).subscribe(
        {
          next:(res)=>{
            this.toaster.success({detail:'SUCCESS',summary:res.message,duration:4000})
            this._router.navigate(['login']);

          },
          error:(err)=>{
            this.toaster.error({detail:'ERROR',summary:err.message,duration:4000})
          console.log(err);
          }
        }
      )

        
    }
    else
    {
      this.ValidateAllControls(this.signupForm);
    }
  }
  private ValidateAllControls(formGroup:FormGroup){
    debugger
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true})
      }
      else if (control instanceof FormGroup){
        this.ValidateAllControls(control);
      }
    })
  }
}
