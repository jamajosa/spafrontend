import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Company } from './models/company.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  selectedCompany: Company = {
    companyName: '',
    companyAge: '',
    companyDeveloper: []
  };
  company: any;
  mainUrl: string = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

getCompanies() {
  return this._http.get(this.mainUrl + '/companies')
  .map(res=>res);
}

getCompanyById(_id:string) {
 return this._http.get(this.mainUrl + '/companies/' + _id)
 .map(res=>res);
}

addCompany(company){
 let headers = new HttpHeaders();
 headers.append('Content-Type','application/json');
 return this._http.post(this.mainUrl + '/companies/', company, {headers: headers})
 .map(res => res);
}

addCompanyToGame(company, id:string){
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this._http.put(this.mainUrl + '/gamesComp/' + id, company, {headers: headers})
  .map(res => res);
 }

 editCompany(company, id:string){
   console.log(company);
   console.log(id);
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.put(this.mainUrl + '/companies/' + id, company, {headers: headers})
   .map(res => res);
  }


deleteCompany(_id:string){
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.delete(this.mainUrl + '/companies/' + _id, {headers: headers})
 }
}
