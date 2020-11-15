import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  error: String = '';

  ngOnInit(): void {

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
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  login(){
    if(this.loginForm.valid){
    this.auth.login(this.loginForm.value);
    this.auth.Login$.subscribe( response => {
      if (response.usertoken){
        localStorage.setItem('token', response.usertoken);
        this.loginForm.reset();
        alert("login user is dome");

        this.auth.Userdata();
        this.auth.AllUser$.subscribe( (response: any) => { 
          
          console.log(response);
          
         });


        
        this.error = "";
        // console.log(res.error.message);
        //  window.location.replace("http://localhost:4200/user");
        // this.router.navigate(['user/']);

        }else if (response.admintoken)
        {
        localStorage.setItem('token', response.admintoken);
        this.loginForm.reset();
        alert("login admin is dome");  
        


        this.auth.Userdata();
        this.auth.AllUser$.subscribe( (response: any) => { 
          
          console.log(response);
          
         });
        
         



        this.error = "";

        // console.log(res.error.message);
        // window.location.replace('http://localhost:4200/librarian');
        // this.router.navigate(['librarian/']);
        }
        else
        if(response.error){
          this.error = response.error;
          this.loginForm.reset();
        }
    });  
  }
  else{
   this.error = "Filed is not empty";
  }
  }

signup(){

if(this.signupForm.valid){
  this.auth.signup(this.signupForm.value);
  this.auth.signup$.subscribe( response => {
     if(response.error){
      alert(response.error);
     }
    
     alert("Welcome to app");

   });

}


}

}
