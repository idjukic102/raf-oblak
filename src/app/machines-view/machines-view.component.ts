import { Component } from '@angular/core';
import { Masina, StanjeMasine } from '../model';
import { MachineService } from '../services/machine.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-machines-view',
  templateUrl: './machines-view.component.html',
  styleUrls: ['./machines-view.component.css'],
})
export class MachinesViewComponent {
  public StanjeMasine = StanjeMasine;
  readonly svaStanja: StanjeMasine[] = [
    StanjeMasine.Ugasena,
    StanjeMasine.Upaljena,
    StanjeMasine.Unistena,
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
    this.scheduleForm = this.searchBuilder.group({
      operation: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
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
    console.log(this.machines);
  }

  onReset(): void {
    this.createForm.reset({
      name: '',
      stanje: [],
    });
    this.onSubmit();
  }
  // start(id: number) {
  //   this.machineService.start(id).subscribe(() => this.reloadAfterAction());
  // }
  // stop(id: number) {
  //   this.machineService.stop(id).subscribe(() => this.reloadAfterAction());
  // }
  // public StanjeMasine = StanjeMasine;
  // public restarting = new Set<number>();

  // restart(id: number) {
  //   if (this.restarting.has(id)) return;
  //   this.restarting.add(id);

  //   this.machineService.restart(id).subscribe({
  //     next: () => {
  //       this.restarting.delete(id);
  //       this.reloadAfterAction();
  //     },
  //     error: () => {
  //       this.restarting.delete(id);
  //     },
  //   });
  // }
  //   openErrors(id: string) {
  //   this.router.navigate(['/machines', id, 'errors']);
  // }
  private reloadAfterAction() {
    const name = (this.createForm.get('name')?.value || '').trim();
    const stanja = this.createForm.get('stanje')?.value || [];
    this.onSubmit();
  }

  scheduleForm: FormGroup;
  selectedMachine: Masina | null = null;
  showScheduleModal = false;
  openSchedule(machine: Masina) {
    this.selectedMachine = machine;
    this.scheduleForm.reset();
    this.showScheduleModal = true;
  }

  closeSchedule() {
    this.showScheduleModal = false;
  }

  submitSchedule() {
    if (!this.selectedMachine || this.scheduleForm.invalid) return;

    const { operation, date, time } = this.scheduleForm.value;

    const [hours, minutes] = (time as string).split(':').map(Number);
    const execDate = new Date(date as string);
    execDate.setHours(hours ?? 0, minutes ?? 0, 0, 0);

    if (execDate <= new Date()) {
      alert('Vreme mora biti u budućnosti.');
      return;
    }

    const payload = {
      jiBroj: this.selectedMachine.jiBroj,
      operation,
      executeAt: execDate.toISOString(),
    };

    // this.machineService.scheduleOperation(payload).subscribe({
    //   next: () => {
    //     this.closeSchedule();
    //     this.reloadAfterAction();
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     alert('Došlo je do greške pri zakazivanju.');
    //   },
    // });
  }
}
