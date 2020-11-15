import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Login$: Observable<any>;
  signup$: Observable<any>;
  AllUser$: Observable<any>;

  private Base_Url = environment.ROOT_URL;
  constructor( private http: HttpClient) { }

  login(model: any): any{
    this.Login$ = this.http.post<any>(`${this.Base_Url}auth/login`, model);
}

  signup(model: any): any{

    this.signup$ = this.http.post<any>(`${this.Base_Url}auth/signup/user`, model);

}

  Userdata(): any{

    this.AllUser$ = this.http.get<any>(`${this.Base_Url}user/`);

  }


}

