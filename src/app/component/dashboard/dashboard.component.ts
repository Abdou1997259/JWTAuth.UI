import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users:any[]=[];
  username:string=''
  constructor(
    private _auth:AuthService,
    private _api:ApiService
    )
  {

  }
  ngOnInit(): void {
   this._api.GetAllUser().subscribe((res)=>{
    this.users=res
    

   })
   this.username=this._auth.GetUserName();
  }
  logOut()
  {
    this._auth.SingOut();
  }
}
