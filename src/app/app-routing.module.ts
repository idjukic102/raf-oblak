import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MachineCreateComponent } from './machine-create/machine-create.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: HomeComponent,
  //   // canActivate: [AuthGuard],
  //   // canDeactivate: [AuthGuard]
  // },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthGuard],
    //canDeactivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersViewComponent,
  },
  {
    path: 'users/:userId',
    component: UserEditComponent,
  },
  {
    path: "user/create",
    component: UserCreateComponent,
  },
  {
    path: "machine/create",
    component: MachineCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
