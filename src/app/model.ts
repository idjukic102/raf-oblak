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
  Slobodna = 'Slobodna',
  Zauzeta = 'Zauzeta',
  Ugasena = 'Ugasena',
  Upaljena = "Upaljena",
}

export interface Masina {
  name: string;
  jiBroj?: string;
  napravioJe?: string;
  stanje?: StanjeMasine;
  aktivna?: boolean;
} 