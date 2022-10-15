import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { global } from './global';


@Injectable()
export class UserService{
    public url: string;
    public identity: any;
    public token: any;

    constructor(private _http: HttpClient){

            this.url = global.url
            
          
    }


    register(user :any ): Observable<any> {
        //Convertir el objeto del usuario a un json string
        let params = JSON.stringify(user)

        //Definir las cabeceras
        let header = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer peticion ajax
        return this._http.post(this.url + 'registro', params, { headers: header })
    }

    login(user: any, gettoken: boolean): Observable<any> {
              //Comprobar si llego el token
        if (gettoken != false) {
           
            user.gettoken = gettoken;
            
        }
        
        //Convertir el objeto del usuario a un json string
        let params = JSON.stringify(user)


        //Definir las cabeceras
        let header = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer peticion ajax
        return this._http.post(this.url + 'login', params, { headers: header })
    }

    getIdentity(){
        
        let identity = JSON.parse(localStorage.getItem("identity") || "{}")
        
        
        if (identity && identity !== null && identity !== "undefined") {
            
            this.identity = identity
            
        }else{

            this.identity = null
        }

  
     
        return this.identity
    }

    getToken() {

        let token = localStorage.getItem("token") 

        if ( token && token != null && token != "undefined") {

            this.token = token

        } else {

            this.token = null
        }

       
        return this.token

    }

    update(user:any):Observable<any>{

        let params =  JSON.stringify(user)

        let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
        
        return this._http.put(this.url + 'update', params, {headers:header})
    }

    getUsers():Observable<any>{

        return this._http.get(this.url + 'users');
    }

    getUser(userId: any): Observable<any> {

        return this._http.get(this.url + 'user/' + userId);
    }
    // getUserById(token:any, id:any):Observable<any>{

    //     let param = JSON.stringify(id)


    // }


}

