import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { SingledataComponent } from './singledata/singledata.component';

const routes: Routes = [
  {
    path: "",
    component: SingledataComponent
   },
   {
    path:"list",
    component:ListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMoreRoutingModule { }
