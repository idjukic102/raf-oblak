import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Masina, StanjeMasine } from '../model';
export let machines: Masina[] = [
  {
    name: 'Masina A1',
    jiBroj: 'MAS-001-A1',
    stanje: StanjeMasine.Slobodna,
    napravioJe: 'USR-001',
    aktivna: true,
  },
  {
    name: 'Masina B2',
    jiBroj: 'MAS-002-B2',
    stanje: StanjeMasine.Zauzeta,
    napravioJe: 'USR-002',
    aktivna: true,
  },
  {
    name: 'Masina C3',
    jiBroj: 'MAS-003-C3',
    stanje: StanjeMasine.Slobodna,
    napravioJe: 'USR-003',
    aktivna: true,
  },
  {
    name: 'Masina D4',
    jiBroj: 'MAS-004-D4',
    stanje: StanjeMasine.Zauzeta,
    napravioJe: 'USR-002',
    aktivna: false,
  },
  {
    name: 'Masina E5',
    jiBroj: 'MAS-005-E5',
    stanje: StanjeMasine.Slobodna,
    napravioJe: 'USR-001',
    aktivna: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  constructor() {}

  getMasine(name: string, stanja: StanjeMasine[]): Observable<Masina[]> {
    let user = 'dodati usera iz local storage';
    //if user?.role== admin vrati sve, u suprotnom

  const ime = (name ?? '').trim().toLowerCase();
  const states = (stanja ?? []).filter(s => s != null);
  const statesSet = new Set<StanjeMasine>(states);

  const noName = ime.length === 0;
  const noStates = statesSet.size === 0;
  if (noName && noStates) {
    return of(machines);
  }

  const filtered = machines.filter(m => {
    const matchesName = noName
      ? true
      : (m.name ?? '').toLowerCase().includes(ime);

    const matchesState = noStates
      ? true
      : statesSet.has(m.stanje!);

    return matchesName && matchesState;
  });
  return of(filtered)
  }

  //   findMasina(id: number): Observable<Masina | undefined> {
  //     return of(MOCK_MASINE.find((m) => m.jiBroj === `MAS-${id}`));
  //   }

  addMachine(machine: Masina): Observable<Masina[]> {
    machine.jiBroj = 'ma 2';
    machine.napravioJe = 'ulogovan';
    machine.stanje = StanjeMasine.Ugasena;
    machine.aktivna = true;

    machines.push(machine);
    return of(machines);
  }
}
