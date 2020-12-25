import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { TokenService } from 'src/app/core/service/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singledata',
  templateUrl: './singledata.component.html',
  styleUrls: ['./singledata.component.css']
})
export class SingledataComponent implements OnInit {

  public User: any = {};
  status: any = false;
  UserName: any;
  UpdateForm: FormGroup;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private token: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.token.istoken() == true) {
      this.status = true;

      this.route.params.subscribe(params => {
        this.UserName = params;
        this.auth.SingalUser(params.id).subscribe((response: any) => {
          this.User = response;
        })
      }
      );
    }

    this.UpdateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required])
    });
  }

  Update( name: any, Email: any, About: any ): any {

    const Updatedata={
      name: name,
      email:Email,
      about: About
    }
    console.log(Updatedata);
    // this.auth.UpdateUser(this.UpdateForm.value,this.UserName.id);

    this.auth.UpdateUser(Updatedata,this.UserName.id).subscribe( response => {
        if(response.error){
          alert(response.error);
        }
        alert("User is Updated");
        window.location.reload();
      });
    
  }

  DeleteAccoutn(): any {

    var a = confirm("You want to delete User Account");
    if (a) {
      this.auth.DeleteAccount(this.UserName.id).subscribe((response: any) => {
        // window.location.reload();
      });
    }
    console.log("working");
    this.router.navigate(['../list']);
  }
}
