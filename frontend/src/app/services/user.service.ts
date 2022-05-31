import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  isAuth = false;
  urlApi = "http://localhost:3000/users";
  loginUrl = "http://localhost:3000/login";
  tokenTimer;
  constructor(private http:HttpClient, private router: Router) {
   }

  loginService(u):Observable<{tok:string,expiresIn:number}>{
    console.log('------login service------',u);
    this.isAuth = true;
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    let options = {
      headers: headers
    };
     return this.http.post<{tok:string,expiresIn:number}>(this.loginUrl,u,options);
    
    }

  setTimer(expiresIn){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, expiresIn * 1000);

  }

  logout(){
    localStorage.removeItem("token");
    clearTimeout(this.tokenTimer);
    console.log("Router : " + this.router);
    this.isAuth = false;
    this.router.navigate(["/"]);
  }

  createUserService(u:User):Observable<any>{
    const headers = new HttpHeaders({ 'content-type': 'application/json'});
    let options = {
      headers: headers
    };
    console.log(JSON.stringify(u))
    return this.http.post(this.urlApi,JSON.stringify(u),options);
  }
}
