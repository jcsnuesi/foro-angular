import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../service/user.service';
import { global } from '../service/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})

export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status:any;
  public afuConfig;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    this.page_title = "Ajustes de usuario";
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity.user
    this.url = global.url
    this.afuConfig = {

        multiple: false,
        formatsAllowed: ".jpg, .jpeg, .png, .gif",
        maxSize: 50,
        uploadAPI:{
          url: this.url + "upload-avatar",
          headers: {
            "Authorization": this.token
          }

        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,
        attachPentText: 'Upload your avatar here!'
      
    };
   }

  avatarUpload(data : any){
    
    let data_obj = data.body
    this.user.image = data_obj.user.image

    console.log(data_obj)
  }

  ngOnInit(): void {

  }

  onSubmit(user:any){

    this._userService.update(this.user).subscribe(
      response =>{
      
        if (!response) {

          this.status = 'error';
          
        }else{
          
          this.status = 'success';
          localStorage.setItem("identity", JSON.stringify(response) )
      

          }

      },
      error => {
        console.log(error)
      }
    )


  }

}
