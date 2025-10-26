export interface User{
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    permissions: Dozvole[]
}

export interface Login{
    email:string,
    password:string
}
export enum Dozvole{
    Read="read",Create="create",Update="update",Delete="delete"
}

export enum StanjeMasine {
  Ugasena = 'Ugasena',
  Upaljena = "Upaljena",
  Unistena = "Unistena",
}

export interface Masina {
  name: string;
  jiBroj: number;
  napravioJe: string;
  stanje: StanjeMasine;
  aktivna: boolean;
} 

export interface CreateMasina {
  name: string;
  jiBroj?: number;
  napravioJe?: string;
  stanje?: StanjeMasine;
  aktivna?: boolean;
} 