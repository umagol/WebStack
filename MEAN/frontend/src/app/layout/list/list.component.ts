import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/User';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public User: User;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if(this.token.istoken() == false){
      this.router.navigate(['/home']);  
    }

    this.auth.Userdata().subscribe((Response: any) => {
      this.User = Response;
    }); 
  }

}
