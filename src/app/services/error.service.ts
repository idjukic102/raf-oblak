import { Injectable, OnInit } from '@angular/core';
import { MachineService } from './machine.service';
import { Observable, of } from 'rxjs';
import { Error } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private machineService: MachineService) { 
  }

   greske: Error[]= [
  {
    date: "2025-10-27",
    jiBroj: 1,
    operation: "Restartuj",
    description: "Sistem se nije ponovo pokrenuo zbog neispravne konfiguracije."
  },
  {
    date: "2025-10-27",
    jiBroj: 3,
    operation: "Upali",
    description: "Neuspešno inicijalizovanje napajanja — proveriti napon."
  },
  {
    date: "2025-10-26",
    jiBroj: 5,
    operation: "Pretraga",
    description: "Baza podataka mašina nije dostupna."
  },
  {
    date: "2025-10-26",
    jiBroj: 2,
    operation: "Napravi",
    description: "Neuspešno kreiranje novog objekta — nedostaju parametri."
  },
  {
    date: "2025-10-25",
    jiBroj: 6,
    operation: "Ugasi",
    description: "Mašina nije reagovala na komandu za gašenje."
  },
  {
    date: "2025-10-25",
    jiBroj: 8,
    operation: "Uništi",
    description: "Operacija uništavanja nije dozvoljena u ovom režimu rada."
  },
  {
    date: "2025-10-24",
    jiBroj: 4,
    operation: "Restartuj",
    description: "Proces se zaglavio u fazi resetovanja memorije."
  },
  {
    date: "2025-10-23",
    jiBroj: 7,
    operation: "Pretraga",
    description: "Nema rezultata — nedostupan indeks pretrage."
  },
  {
    date: "2025-10-22",
    jiBroj: 2,
    operation: "Upali",
    description: "Prekoračen vremenski limit tokom startovanja."
  },
  {
    date: "2025-10-21",
    jiBroj: 5,
    operation: "Uništi",
    description: "Neuspešno brisanje datoteka — nedovoljno dozvola."
  }
];

  

  getErrors():Observable<Error[]>{
      let korisnikoveGreske: Error[] = [];
      this.machineService.getMasine('',[]).subscribe(machines => {
      const machineIds = machines.map(m => m.jiBroj);
      korisnikoveGreske = this.greske.filter(err => machineIds.includes(err.jiBroj));
      }
      )
      return of(korisnikoveGreske);
  }

  
}
