import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 url:string=environment.apiUrl;
  constructor(private _http:HttpClient) {

   }
  GetAllUser():Observable<any[]>
  {
     return this._http.get<any[]>(`${this.url}Auth/GetUsers`)
  }
   
}
