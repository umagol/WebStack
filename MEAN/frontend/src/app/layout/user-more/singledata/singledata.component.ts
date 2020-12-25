import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-singledata',
  templateUrl: './singledata.component.html',
  styleUrls: ['./singledata.component.css']
})
export class SingledataComponent implements OnInit {

  public User: any = {};
  status: any = false;
  UserName: any;
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
          console.log(response);
        })
      }
      );
    }
  }
  Update(): any {

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
