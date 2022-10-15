import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/app/models/user';
import {Router, ActivatedRoute, Params}  from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public status: any;
  public page_title: string;
  public user: User;
  public identity:any;
  public token: any;

  
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.page_title = "Bienvenido al login"
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');

   }

  ngOnInit(): void {


  }

  onSubmit(login : any){
  
//conseguir objeto completo del usuario
    this._userService.login(this.user, false).subscribe(
      response =>{
        
        if(response.user && response.user._id){
          //Guardar el usaurio en una propiedad
          this.identity = response;
         
         
          localStorage.setItem("identity", JSON.stringify(this.identity))
         
          //Comprobar si el toquen esta
          this._userService.login(this.user, true).subscribe(
            response => {

              //Recibimos el token correctamente

              if (response.token) {
                            
                //Guardar token del usuario en una propiedad
                this.token = response.token
                localStorage.setItem("token", this.token)

                this.status = 'success'
                this._router.navigate(['/inicio'])

       
              } else {
                this.status = 'error';
              }


            },
            error => {

              console.log(error)
              this.status = 'error';

            }
          )
         
       
        }else{
          this.status = 'error';
        }
      
      
      },
      error =>{

        console.log(error)
        this.status = 'error';

      }
    )
  }

}
