import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../services/models/game.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
   games: any =[];
   gamee:any;
   constructor(private _gameService: GameService,private router: Router) {
   }

   ngOnInit() {
     this.games = [];
     this._gameService.getGames()
        .subscribe(res => this.games = res);
   }

   photoclicked(a:any){
     this.gamee = a;
   }

}
