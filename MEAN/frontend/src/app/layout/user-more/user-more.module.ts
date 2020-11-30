import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMoreRoutingModule } from './user-more-routing.module';
import { SingledataComponent } from './singledata/singledata.component';


@NgModule({
  declarations: [SingledataComponent],
  imports: [
    CommonModule,
    UserMoreRoutingModule
  ]
})
export class UserMoreModule { }
