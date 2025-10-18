import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   {
    path: "login",
    component: LoginComponent,
    //canActivate: [AuthGuard],
    //canDeactivate: [AuthGuard]
  },
  {
    path: "users",
    //component: UsersComponent
  },
  {
    path: "user/create",
    //component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
