import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetheaderService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenizedReq = req.clone(
      {
          setHeaders: {
            Authorization: localStorage.getItem('token')
          }
      }
    );
    return next.handle(tokenizedReq);
  }


}