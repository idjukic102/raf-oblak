import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit{

  users: User[]=[];
  constructor(private userService: UserService){
    
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users=>{
      this.users = users;
    });
  }
}
