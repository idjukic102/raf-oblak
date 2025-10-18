import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Dozvole, Login, User } from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private readonly apiUrl = environment.usersApi

  users : User[]= [
  {
    userId: 1,
    firstName: 'Marko',
    lastName: 'Marković',
    email: 'marko.markovic@example.com',
    password: '$2b$10$M2NQy5DhxT8eBpygqB1eKuCe5iPRVsojylqEzyV9PtFCEwJ6n7PFS',
    permissions: [Dozvole.Read, Dozvole.Create, Dozvole.Update, Dozvole.Delete]
  },
  {
    userId: 2,
    firstName: 'Jelena',
    lastName: 'Jovanović',
    email: 'jelena.jovanovic@example.com',
    password: '$2b$10$FrnZ8l6nb9iG4F4Oa7TeVuNRcDh7QySyYF9pTQY4cS4e1ul0VJzsy',
    permissions: [Dozvole.Read, Dozvole.Update]
  },
  {
    userId: 3,
    firstName: 'Ivan',
    lastName: 'Petrović',
    email: 'ivan.petrovic@example.com',
    password: '$2b$10$R1o7dZ7eOqM9MeM.0uqDIuWm/RN.zRifQf3M3AfMZ0PFr4pGJ7Z4i',
    permissions: [Dozvole.Read]
  },
  {
    userId: 4,
    firstName: 'Milica',
    lastName: 'Stojanović',
    email: 'milica.stojanovic@example.com',
    password: '$2b$10$SgD3l6oCJv3zvDqV7GJ0Nex9Qn7OxItS5gZVw/12mYj2p4SkG04e2',
    permissions: [Dozvole.Create, Dozvole.Read]
  },
  {
    userId: 5,
    firstName: 'Nemanja',
    lastName: 'Nikolić',
    email: 'nn',
    password: '123',
    permissions: []
  }
]


  constructor(private httpClient: HttpClient) { }

  login(login:Login) {
    this.users.find(user=>user.email===login.email && user.password===login.password)
   
  }

//   getUsers(): Observable<Login[]> {
//     return this.httpClient.get<Login[]>(`${this.apiUrl}/users`);
//   }


//   findUser(id: number): Observable<Login> {
//     return this.httpClient.get<Login>(`${this.apiUrl}/users/${id}`)
//   }
}