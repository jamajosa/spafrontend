import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './models/user.model';
import 'rxjs/add/operator/map';
import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService{
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient){}


postUser(user:User){
  return this.http.post(environment.apiBaseUrl + "/users/register",user);
}

getUsers() {
  return this.http.get(environment.apiBaseUrl + "/users")
  .map(res=>res);
}

login(authCredentials){
  return this.http.post(environment.apiBaseUrl + "/authenticate",authCredentials);
}
setToken(token:string){
  localStorage.setItem('token', token);
}
deleteToken(){
  localStorage.removeItem('token');
}

getUserPayload(){
  var token = localStorage.getItem('token');
  if(token){
    var userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload)
  }
  else{
    return null;
  }
}
  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now() / 1000;
    }
  }
}
