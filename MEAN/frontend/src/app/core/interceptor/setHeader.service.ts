import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class SetheaderService implements HttpInterceptor {
  constructor(private token: TokenService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenizedReq = req.clone(
      {
          setHeaders: {
            Authorization: 'Bearer ' + this.token.gettoken()
          }
      }
    );
    return next.handle(tokenizedReq);
  }


}