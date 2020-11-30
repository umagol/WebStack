import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingledataComponent } from './singledata/singledata.component';

const routes: Routes = [
  {
    path: "",
    component: SingledataComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMoreRoutingModule { }
