import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dozvole, Login, User } from '../model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private readonly apiUrl = environment.usersApi

  users: User[] = [
    {
      userId: 1,
      firstName: 'Marko',
      lastName: 'Marković',
      email: 'admin@gmail.com',
      password: '123',
      permissions: [
        Dozvole.Read,
        Dozvole.Create,
        Dozvole.Update,
        Dozvole.Delete,
        Dozvole.Napravi,
        Dozvole.Pretrazi,
        Dozvole.Upali,
        Dozvole.Ugasi,
        Dozvole.Restartuj,
        Dozvole.Unisti,
      ],
    },
    {
      userId: 2,
      firstName: 'Jelena',
      lastName: 'Jovanović',
      email: 'j@gmail.com',
      password: '123',
      permissions: [
        Dozvole.Read,
        Dozvole.Update,
        Dozvole.Napravi,
        Dozvole.Pretrazi,
        Dozvole.Ugasi,
      ],
    },
    {
      userId: 3,
      firstName: 'Ivan',
      lastName: 'Petrović',
      email: 'i@gmail.com',
      password: '123',
      permissions: [Dozvole.Read],
    },
    {
      userId: 4,
      firstName: 'Milica',
      lastName: 'Stojanović',
      email: 'ms@.com',
      password: '123',
      permissions: [Dozvole.Create, Dozvole.Read],
    },
    {
      userId: 5,
      firstName: 'Nemanja',
      lastName: 'Nikolić',
      email: 'nn@gmail.com',
      password: '123',
      permissions: [],
    },
  ];

  constructor(private httpClient: HttpClient) {}

  login(login: Login): boolean {
    let user = this.users.find(
      (user) => user.email === login.email && user.password === login.password
    );
    //this.router.navigate()
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } else return false;
  }

  logout(login: Login) {
    localStorage.removeItem('user');
  }

  addUser(user: User) {
    this.users.push(user);
  }

  editUser(user: User) {
    this.users[user.userId - 1] = user;
  }
  getUsers(): Observable<User[]> {
    return of(this.users);
  }
  findUser(id: number): Observable<User | undefined> {
    return of(this.users.find((user) => user.userId == id));
  }
}
