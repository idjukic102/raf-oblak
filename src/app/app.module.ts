import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MachineCreateComponent } from './machine-create/machine-create.component';
import { MachinesViewComponent } from './machines-view/machines-view.component';
import { ErrorsViewComponent } from './errors-view/errors-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersViewComponent,
    UserEditComponent,
    UserCreateComponent,
    MachineCreateComponent,
    MachinesViewComponent,
    ErrorsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
