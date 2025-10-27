import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MachineCreateComponent } from './machine-create/machine-create.component';
import { MachinesViewComponent } from './machines-view/machines-view.component';
import { authGuard } from './guards/auth.guard';
import { ErrorsViewComponent } from './errors-view/errors-view.component';

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
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/:userId',
    component: UserEditComponent,
    canActivate: [authGuard],
    
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'machine/create',
    component: MachineCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'machine/search',
    component: MachinesViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'machine/errors',
    component: ErrorsViewComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
