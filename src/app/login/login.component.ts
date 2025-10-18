import { Component } from '@angular/core';
import { Login } from '../model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: Login={
    email:"",
    password:""
  }
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(4)]],
    })
  }


  onSubmit(login:any){
   this.userService.login(login);
  }
}
