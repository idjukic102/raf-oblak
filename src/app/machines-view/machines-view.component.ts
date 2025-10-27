import { Component } from '@angular/core';
import { Masina, StanjeMasine } from '../model';
import { MachineService } from '../services/machine.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-machines-view',
  templateUrl: './machines-view.component.html',
  styleUrls: ['./machines-view.component.css'],
})
export class MachinesViewComponent {
  readonly svaStanja: StanjeMasine[] = [
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
      stanja: [[] as StanjeMasine[]],
    });
  }

  onSubmit(): void {
    const selected =
      (this.createForm.get('stanja')?.value as StanjeMasine[]) || [];

    //this.user.name = this.createForm.get('name')?.value;
    //this.user.permissions = selected;
    const name = (this.createForm.get('name')?.value || '').trim();
    console.log(`${name} i ${selected}`);
    this.machineService.getMasine(name, selected).subscribe((machines) => {
      this.machines = machines;
      console.log(machines);
    });
  }
  ngOnInit(): void {
    this.machineService.getMasine('', []).subscribe((machines) => {
      this.machines = machines;
    });
  }

  onReset(): void {
    this.createForm.reset({
      naziv: '',
      stanje: [],
    });
    this.onSubmit();
  }
  start(id: number) {
    this.machineService.start(id).subscribe(() => this.reloadAfterAction());
  }
  stop(id: number) {
    this.machineService.stop(id).subscribe(() => this.reloadAfterAction());
  }
  public StanjeMasine = StanjeMasine;
  public restarting = new Set<number>();

  restart(id: number) {
    if (this.restarting.has(id)) return;
    this.restarting.add(id);

    this.machineService.restart(id).subscribe({
      next: () => {
        this.restarting.delete(id);
        this.reloadAfterAction();
      },
      error: () => {
        this.restarting.delete(id);
      },
    });
  }
  destroy(id: number) {
    this.machineService.destroy(id).subscribe(() => this.reloadAfterAction());
  }

  private reloadAfterAction() {
    const name = (this.createForm.get('name')?.value || '').trim();
    const stanja = this.createForm.get('stanje')?.value || [];
    this.onSubmit();
  }
}
