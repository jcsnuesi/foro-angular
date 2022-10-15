import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
//El CanActivate es lo que hace que esto guarde las rutas que son con acceso
export class UserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        
        let identity = this._userService.getIdentity();
     
        if (identity && identity.user) {
            return true;
        }else{
          
            this._router.navigate(['/inicio'])
          
                return false;
        
           
        }
    }
}