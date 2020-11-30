import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ListComponent } from './layout/list/list.component';
import { UserMoreModule } from './layout/user-more/user-more.module';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"list",
    component:ListComponent
  },
  {
    path:":id",
    loadChildren: () =>
    import("./layout/user-more/user-more.module").then(m => m.UserMoreModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
