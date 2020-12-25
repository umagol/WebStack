import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { UserMoreRoutingModule } from './user-more-routing.module';
import { SingledataComponent } from './singledata/singledata.component';


@NgModule({
  declarations: [SingledataComponent],
  imports: [
    CommonModule,
    UserMoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserMoreModule { }
