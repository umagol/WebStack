import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { User } from 'src/app/core/model/User';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public error: String = '';
  status: any = false;
  UserId = this.cookie.get('id');
  User: User;
  ngOnInit(): void {
    
    if(this.token.istoken() == true){
      this.status = true;
        

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.cookie.get('access-token'));
      console.log(jwt_decode(this.cookie.get('access-token')));
      const UserEmail = decodedToken.Email;
      console.log(UserEmail);
        this.auth.SingalUser(UserEmail).subscribe( (response: any) => { 
          console.log(response); 
          this.User = response;
         });
    }
  }

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private cookie: CookieService
    ){}

}
