import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Game } from './models/game.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  selectedGame: Game = {
    gameName: '',
    gameDetails: '',
    gameImage: '',
    gameCompany: null
  };
  game: any;
  mainUrl: string = environment.apiBaseUrl;


  constructor(private _http: HttpClient) { }


getGames() {
  return this._http.get(this.mainUrl + '/games')
  .map(res=>res);
}

getGameById(_id:string) {
 return this._http.get(this.mainUrl + '/games/' + _id)
 .map(res=>res);
}

addGame(game){
 let headers = new HttpHeaders();
 headers.append('Content-Type','application/json');
 return this._http.post(this.mainUrl + '/games/', game, {headers: headers})
 .map(res => res);
}

 editGame(game, id:string){
   console.log(game);
   console.log(id);
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.put(this.mainUrl + '/games/' + id, game, {headers: headers})
   .map(res => res);
  }


deleteGame(_id:string){
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   return this._http.delete(this.mainUrl + '/games/' + _id, {headers: headers})
 }
}
