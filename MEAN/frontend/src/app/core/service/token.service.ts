import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor( 
        private cookie: CookieService,
        ) { }

    SetToken(token: any): any{
        this.cookie.set('access-token',token);
    }

    istoken(): any{
        if(this.cookie.get('access-token')){
            console.log('is login');
            return true;
        }else{
            console.log('is not login   ');
            return false;
        }
    }
    gettoken(): any{
        return this.cookie.get('access-token');
    }
}