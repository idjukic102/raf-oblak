import { Component } from '@angular/core';
import { Login } from '../model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: Login = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  // onSubmit(login:any){
  //  this.userService.login(login);
  // }
  onSubmit() {
    this.login.email = this.loginForm.get('email')?.value;
    this.login.password = this.loginForm.get('password')?.value;
    if (!this.userService.login(this.login))
      this.snackBar.open('Pogrešan email ili lozinka!', 'Zatvori', {
        duration: 4000,
        panelClass: ['error-snackbar'],
      });

    this.router.navigate(['users']);
  }
}
