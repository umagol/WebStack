import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/core/model/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public error: String = '';
  status: any = false;
  public User: any  = {};
  
  ngOnInit(): void {
    
    if(this.token.istoken() == true){
      this.status = true;
        

      const UserEmail = this.token.decodetoekn(); 
        this.auth.SingalUser(UserEmail).subscribe( (response: any) => { 
          this.User = response;
         });
    }
  }

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private cookie: CookieService,
    private route: Router
    ){}

    Update(): any{
      
    }

    DeleteAccoutn(): any{
      const UserEmail = this.token.decodetoekn()
       this.auth.DeleteAccount(UserEmail).subscribe( (response: any) => { 
        this.auth.logout();
        this.route.navigate['/home'];
        window.location.reload();
       });
    }
}