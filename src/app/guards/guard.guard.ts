import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router,private token: TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,rejects)=>{
        if(this.authService.loggedIn()==true){
          resolve(true)
        }else{
          this.router.navigate(['/admin/login'])
          this.token.signOut()
          resolve(false)
        }
      })

  }
  
}
