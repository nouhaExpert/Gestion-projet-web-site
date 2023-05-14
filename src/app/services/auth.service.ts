import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService()
  roles: string[] = []
  constructor(private http: HttpClient,private token: TokenStorageService) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.urlBackend}`+'employees/login', {
      email,
      password
    });
  }
  
  loggedIn(){
    let token:any=this.token.getToken()
    if(!token){
      return false
    }
    
    if(this.helper.isTokenExpired(token)){
      return false
    }
    return true
  }
  loggedAdmin(){
    const user = this.token.getUser();
    this.roles = user.rolesNom;
    
    if(!this.roles.includes('admin')){
      return false
    }
    return true
  }
  loggedDirecteur(){
    const user = this.token.getUser();
    this.roles = user.rolesNom;
    
    if(!this.roles.includes('directeur')){
      return false
    }
    return true
  }
  loggedDeveloppeur(){
    const user = this.token.getUser();
    this.roles = user.rolesNom;
    
    if(!this.roles.includes('developpeur')){
      return false
    }
    return true
  }
  loggedTesteur(){
    const user = this.token.getUser();
    this.roles = user.rolesNom;
    
    if( !this.roles.includes('testeur') ){
      return false
    }
    return true
  }
}
  