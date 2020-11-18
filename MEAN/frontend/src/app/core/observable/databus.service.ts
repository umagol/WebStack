import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabusService {

  private defaultLoginStatus = false;
  isLoggedIn = new BehaviorSubject<any>(this.defaultLoginStatus);

  constructor(){
  }

  isLogin(status: boolean): any{
    this.isLoggedIn.next(status);
    console.log(this.defaultLoginStatus);
  }

}

