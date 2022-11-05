import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './components/service/user.service';
import {  Router , ActivatedRoute, Params } from '@angular/router';
import { global } from './components/service/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title;
  public identity: any;
  public token;
  public url;
  public search:any;

  constructor(

    private _userService: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute

  ){
    this.url = global.url
    this.title = 'Hector Santos'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()

  }

  ngOnInit(): void {

    this.identity 
    this.token
    console.log(this.identity)
  }
 ngDoCheck(): void {
  
   this.identity = this._userService.getIdentity() 

  
  
 }

  logout(): void{
   localStorage.clear();
   this.identity = null
   this.token = null
   this._router.navigate(['/inicio'])
 }

  goSearch() { 
    this._router.navigate(['/buscar', this.search])
    
  }

}
