import { Component } from '@angular/core';
import { Masina, StanjeMasine } from '../model';
import { MachineService } from '../services/machine.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-machines-view',
  templateUrl: './machines-view.component.html',
  styleUrls: ['./machines-view.component.css'],
})
export class MachinesViewComponent {

  readonly svaStanja: StanjeMasine[] = [
      StanjeMasine.Slobodna,
      StanjeMasine.Zauzeta,
      StanjeMasine.Ugasena,
      StanjeMasine.Upaljena,
    ];
  
  createForm: FormGroup;
  machines: Masina[] = [];
  constructor(
    private machineService: MachineService,
    private searchBuilder: FormBuilder
  ) {
    this.createForm = this.searchBuilder.group({
      name: [''],
      stanja: this.searchBuilder.array([]),
    });
  }
  get stanjaFA(): FormArray {
      return this.createForm.get('stanja') as FormArray;
    }

    onSubmit(): void {
        const selected = this.stanjaFA.controls
          .map((c, i) => (c.value ? this.svaStanja[i] : null))
          .filter((v): v is StanjeMasine => v !== null);
        //this.user.name = this.createForm.get('name')?.value;
        //this.user.permissions = selected;
    
        this.machineService.getMasine(this.createForm.get('name')?.value, selected);
      }
  ngOnInit(): void {
    this.machineService.getMasine('',[]).subscribe((machines) => {
      this.machines = machines;
    });
  }
}
