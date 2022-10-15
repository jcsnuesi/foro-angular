import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public status: any;
  public page_title : string;
  public user:User;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Registrate";
    this.user = new User('', '','','','','', 'ROLE_USER');
    
  }


  ngOnInit(): void {
     
  }

  onSubmit(form: any){
    this._userService.register(this.user).subscribe(
      response =>{


        if(response.user && response.user._id){
        
         form.reset()
         this.status = 'success'
        }else{
          this.status = 'error'
        }

      },
      error =>{
        console.log(error)

      }
    )
  
  }

}
