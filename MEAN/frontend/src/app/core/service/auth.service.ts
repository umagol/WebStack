import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Base_Url = environment.ROOT_URL;
  constructor( private http: HttpClient) { }

  login(model: any){

    return this.http.post<any>(`${this.Base_Url}/auth/login`, model);

}

  signup(model: any){

    return this.http.post<any>(`${this.Base_Url}/auth/signup`, model);
  
}

}

