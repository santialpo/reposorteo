import {Router,CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        if (!this.auth.isAuthenticaded()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
     
}