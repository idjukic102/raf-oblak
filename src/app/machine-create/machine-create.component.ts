import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from '../services/machine.service';
import { CreateMasina, Masina } from '../model';

@Component({
  selector: 'app-machine-create',
  templateUrl: './machine-create.component.html',
  styleUrls: ['./machine-create.component.css']
})
export class MachineCreateComponent {

  createForm: FormGroup;
  machine: CreateMasina = {
  name : '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private machineService: MachineService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  onSubmit(): void {

    this.machine.name = this.createForm.get('name')?.value;
  

    this.machineService.addMachine(this.machine).subscribe(ma=>
      this.createForm.reset());
    this.router.navigate(['machine/search']);
  }

  ngOnInit(): void {

  }
}
