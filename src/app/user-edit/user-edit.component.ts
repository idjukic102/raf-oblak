import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Dozvole, User } from '../model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
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
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permissions: this.formBuilder.array([]),
    });
  }
  get permissionsFA(): FormArray {
    return this.editForm.get('permissions') as FormArray;
  }
  onSubmit(): void {
    const selectedPermissions = this.permissionsFA.controls
      .map((c, i) => (c.value ? this.allPermissions[i] : null))
      .filter((v): v is Dozvole => v !== null);
    this.user.firstName = this.editForm.get('firstName')?.value;
    this.user.lastName = this.editForm.get('lastName')?.value;
    this.user.email = this.editForm.get('email')?.value;
    this.user.permissions = selectedPermissions;

    this.userService.editUser(this.user);
    this.router.navigate(['users']);
  }

  ngOnInit(): void {
    const id: number = parseInt(
      <string>this.route.snapshot.paramMap.get('userId')
    );
    this.userService.findUser(id).subscribe((u) => {
      if (u) {
        this.user = u;
        this.editForm.patchValue({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
        });
        this.permissionsFA.clear();
        const selected = new Set(u.permissions ?? []);
        this.allPermissions.forEach((p) => {
          this.permissionsFA.push(new FormControl(selected.has(p)));
        });
      }
      console.log(u);
      return u;
    });
  }
}
