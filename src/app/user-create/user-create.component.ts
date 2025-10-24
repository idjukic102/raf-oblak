import { Component } from '@angular/core';
import { Dozvole, User } from '../model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  readonly allPermissions: Dozvole[] = [
    Dozvole.Read,
    Dozvole.Create,
    Dozvole.Update,
    Dozvole.Delete,
  ];
  user: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    //password: '',
    permissions: [],
  };
  createForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permissions: this.formBuilder.array([]),
    });
  }
  get permissionsFA(): FormArray {
    return this.createForm.get('permissions') as FormArray;
  }
  onSubmit(): void {
    const selectedPermissions = this.permissionsFA.controls
      .map((c, i) => (c.value ? this.allPermissions[i] : null))
      .filter((v): v is Dozvole => v !== null);
    this.user.firstName = this.createForm.get('firstName')?.value;
    this.user.lastName = this.createForm.get('lastName')?.value;
    this.user.email = this.createForm.get('email')?.value;
    this.user.permissions = selectedPermissions;

    this.userService.addUser(this.user);
    this.router.navigate(['users']);
  }

  ngOnInit(): void {
    const id: number = parseInt(
      <string>this.route.snapshot.paramMap.get('userId')
    );
    this.permissionsFA.clear();
    this.allPermissions.forEach((p) => {
      this.permissionsFA.push(new FormControl(false));
    });
  }
}
