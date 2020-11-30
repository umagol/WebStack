import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/User';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Login$: Observable<any>;
  signup$: Observable<any>;
  AllUser$: Observable<any>;
  User: User;
  private Base_Url = environment.ROOT_URL;
  constructor( 
    private http: HttpClient,
    private cookie: CookieService
    ) { }

  login(model: any): any{
    this.Login$ = this.http.post<any>(`${this.Base_Url}auth/login`, model);
}

  signup(model: any): any{
    this.signup$ = this.http.post<any>(`${this.Base_Url}auth/signup/user`, model);
}

  Userdata(): Observable<any>{
  return this.http.get<any>(`${this.Base_Url}user/`).pipe(map(response =>{
    return response
  }))  
}

  logout(): any{
      this.cookie.delete('access-token');
      this.cookie.deleteAll();
}

  SingalUser(userEmail: any): any{
   var model: any = {};
   model.email = userEmail;
    return this.http.get<any>(`${this.Base_Url}user/singaluser`, model);
}

  DeleteAccount(userEmail: any): any{
   var model: any ={}
   model.email = userEmail;
   return this.http.delete<any>(`${this.Base_Url}user/delete/`+ userEmail);    
  }
}