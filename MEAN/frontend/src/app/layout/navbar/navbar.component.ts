import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/User';
import { DatabusService } from 'src/app/core/observable/databus.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  AdminsignupForm: FormGroup;
  public error: String = '';
  status: any = false;
  User: User[];

  
  constructor(
    private auth: AuthService,
    private router: Router,
    private databus: DatabusService,
    private token: TokenService
    ){}
  ngOnInit(): void {
    if(this.token.istoken() == true){
      this.status = true;
        // this.auth.Userdata().subscribe( (response: any) => { 
        //   console.log(response); 
        //   this.User = response;
        //  });
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required])
    });

    this.AdminsignupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required])
    });
  }

  login(): any{
    if(this.loginForm.valid){
    this.auth.login(this.loginForm.value);
    this.auth.Login$.subscribe( response => {
      console.log(response);
      this.databus.isLogin(true);
      
      if (response.usertoken){ // if user toekn is the login as a user
        this.token.SetToken(response.usertoken);
        
        this.loginForm.reset();
        alert("Welcome");
        window.location.reload();

        this.error = "";
        
        }else 
        if (response.admintoken) // login as a admin
        {
        this.token.SetToken(response.admintoken);

        this.loginForm.reset();
        alert("login admin is dome");
        // window.location.replace('/list');
        this.router.navigate(['/list']);  
        
        var cls = document.getElementById("cls"); //It used for  close model in bootstrap 
        cls.click(); // hit button

        this.error = "";
        }
        else
        if(response.error){
          this.error = "Email and Password is incorrect";
          this.loginForm.reset();
        }
    });  
  }
  else{
   this.error = "Filed is not empty";
  }
  }

signup(): any{
  if(this.signupForm.valid){
    this.auth.signup(this.signupForm.value);
    this.auth.signup$.subscribe( response => {
      if(response.error){
        alert(response.error);
      }
      alert("Welcome to app and Login");
      window.location.reload();
    });
  }
}


Adminsignup(): any{
  if(this.AdminsignupForm.valid){
    this.auth.Adminsignup(this.AdminsignupForm.value);
    this.auth.signup$.subscribe( response => {
      if(response.error){
        alert(response.error);
      }
      alert("Welcome to app and Login ");
      window.location.reload();
    });
  }
}

logout(): any{
  this.auth.logout();
  window.location.reload(); 
}


}
