import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateMasina, Dozvole, Masina, StanjeMasine, User } from '../model';
import { MatSnackBar } from '@angular/material/snack-bar';
export let machines: Masina[] = [
  {
    name: 'Masina A1',
    jiBroj: 1,
    stanje: StanjeMasine.Upaljena,
    napravioJe: '2',
    aktivna: true,
  },
  {
    name: 'Masina B2',
    jiBroj: 2,
    stanje: StanjeMasine.Ugasena,
    napravioJe: '2',
    aktivna: true,
  },
  {
    name: 'Masina C3',
    jiBroj: 3,
    stanje: StanjeMasine.Upaljena,
    napravioJe: '3',
    aktivna: true,
  },
  {
    name: 'Masina D4',
    jiBroj: 4,
    stanje: StanjeMasine.Unistena,
    napravioJe: '3',
    aktivna: false,
  },
  {
    name: 'Masina E5',
    jiBroj: 5,
    stanje: StanjeMasine.Upaljena,
    napravioJe: '2',
    aktivna: true,
  },
  {
    name: 'Masina E5',
    jiBroj: 6,
    stanje: StanjeMasine.Upaljena,
    napravioJe: '2',
    aktivna: true,
  },
  {
    name: 'Masina E5',
    jiBroj: 7,
    stanje: StanjeMasine.Ugasena,
    napravioJe: '3',
    aktivna: true,
  },
  {
    name: 'Masina E5',
    jiBroj: 8,
    stanje: StanjeMasine.Unistena,
    napravioJe: '2',
    aktivna: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  sekunde = 5;
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private snackBar: MatSnackBar) {}

  getMasine(name: string, stanja: StanjeMasine[]): Observable<Masina[]> {
    machines = machines.filter((m) => m.aktivna === true);
    let user = JSON.parse(<string>localStorage.getItem('user'));
    console.log(user.userId);
    console.log(user.permissions.length);
    if (user.permissions.length != 4) {
      machines = machines.filter((m) => m.napravioJe == user.userId);
    }

    const ime = (name ?? '').trim().toLowerCase();
    const states = (stanja ?? []).filter((s) => s != null);
    const statesSet = new Set<StanjeMasine>(states);

    const noName = ime.length === 0;
    const noStates = statesSet.size === 0;
    if (noName && noStates) {
      return of(machines);
    }

    const filtered = machines.filter((m) => {
      const matchesName = noName
        ? true
        : (m.name ?? '').toLowerCase().includes(ime);

      const matchesState = noStates ? true : statesSet.has(m.stanje!);

      return matchesName && matchesState;
    });

    return of(filtered);
  }

  findMasina(id: number) {
    return machines.find((m) => m.jiBroj === id);
  }

  addMachine(machine: CreateMasina): Observable<Masina[]> {
    const nextId = machines.length
      ? Math.max(...machines.map((m) => m.jiBroj)) + 1
      : 1;

    const novaMasina: Masina = {
      jiBroj: 100,
      name: machine.name,
      napravioJe: 'ulogovan',
      stanje: StanjeMasine.Ugasena,
      aktivna: true,
    };

    machines.push(novaMasina);
    return of(machines);
  }

  start(id: number): Observable<Masina | undefined> {
    if (this.user.permissions.includes(Dozvole.Upali)) {
      const m = this.findMasina(id);
      if (!m) return of(undefined);
      if (m.stanje === StanjeMasine.Ugasena) {
        m.stanje = StanjeMasine.Upaljena;
      }
      return of(m);
    }
    this.snackBar.open('Nemate dozvolu za tu akciju!', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return of();
  }
  stop(id: number): Observable<Masina | undefined> {
    if (this.user.permissions.includes(Dozvole.Ugasi)) {
      const m = this.findMasina(id);
      if (!m) return of(undefined);
      if (m.stanje === StanjeMasine.Upaljena) {
        m.stanje = StanjeMasine.Ugasena;
      }

      return of(m);
    }
    this.snackBar.open('Nemate dozvolu za tu akciju!', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return of();
  }
  restart(id: number): Observable<Masina | undefined> {
    if (this.user.permissions.includes(Dozvole.Restartuj)) {
      const m = this.findMasina(id);
      if (!m) return of(undefined);
      if (m.stanje !== StanjeMasine.Upaljena) return of(m);

      const totalMs = this.sekunde * 1000 + Math.floor(Math.random() * 5000);
      const halfMs = Math.floor(totalMs / 2);

      setTimeout(() => {
        m.stanje = StanjeMasine.Ugasena;
      }, halfMs);
      setTimeout(() => {
        m.stanje = StanjeMasine.Upaljena;
      }, totalMs);

      return of(m);
    }
    this.snackBar.open('Nemate dozvolu za tu akciju!', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return of();
  }
  destroy(id: number): Observable<Masina | undefined> {
    if (this.user.permissions.includes(Dozvole.Unisti)) {
      const m = this.findMasina(id);
      if (!m) return of(undefined);
      if (m.stanje === StanjeMasine.Ugasena) {
        m.stanje = StanjeMasine.Unistena;
      }
      if (m.aktivna) m.aktivna = false;

      return of(m);
    }
    this.snackBar.open('Nemate dozvolu za tu akciju!', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return of();
  }
}
