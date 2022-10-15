import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/app/models/user';
import { global } from '../service/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users:User[] | any;
  public url;
  public page_title;

  constructor(
    private _userService: UserService
  ) { 
    this.url = global.url
    this.page_title = 'Compañeros'

  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response =>{

        console.log(response.users)
        this.users =response.users

      },
      error => {

        console.log(error)

      }
    )
  }

}
