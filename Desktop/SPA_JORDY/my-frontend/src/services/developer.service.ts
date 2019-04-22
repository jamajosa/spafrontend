import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Developer } from './models/developer.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  selectedDeveloper: Developer = {
    name: '',
    age: ''
  };
  developer: any;
  mainUrl: string = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

getDevelopers() {
  return this._http.get(this.mainUrl + '/developers')
  .map(res=>res);
}

getDeveloperById(_id:string) {
 return this._http.get(this.mainUrl + '/developers/' + _id)
 .map(res=>res);
}

addDeveloper(developer){
 let headers = new HttpHeaders();
 headers.append('Content-Type','application/json');
 return this._http.post(this.mainUrl + '/developers/', developer, {headers: headers})
 .map(res => res);
}

addDeveloperToCompany(developer, id:string){
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this._http.put(this.mainUrl + '/companiesDevs/' + id, developer, {headers: headers})
  .map(res => res);
 }

 editDeveloper(developer, id:string){
   console.log(developer);
   console.log(id);
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.put(this.mainUrl + '/developers/' + id, developer, {headers: headers})
   .map(res => res);
  }


deleteDeveloper(_id:string){
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.delete(this.mainUrl + '/developers/' + _id, {headers: headers})
 }
}
