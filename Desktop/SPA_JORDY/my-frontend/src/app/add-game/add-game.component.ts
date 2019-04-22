import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CompanyService } from '../../services/company.service';
import { Game } from '../../services/models/game.model';
import { Company } from '../../services/models/company.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  constructor(private gameService : GameService,private companyService : CompanyService, private router: Router) { }
  succes:boolean;
  errorMsg:string;
  deleted:boolean;
  gamelist: any = [];
  complist: any = [];
  edit(dev: any,form: NgForm){
    if(form.value.gameName === "" || form.value.gameName === null ){
      form.value.gameName = dev.gameName
    }
    if(form.value.gameDetails === "" || form.value.gameDetails === null ){
      form.value.gameDetails = dev.gameDetails
    }
    if(form.value.gameImage === "" || form.value.gameImage === null ){
      form.value.gameImage = dev.gameImage
    }
    if(form.value.gameCompany === "" || form.value.gameCompany === null ){
      form.value.gameCompany = dev.gameCompany
    }
    this.gameService.editGame(form.value, dev._id).subscribe(
      res =>{
        let index = this.gamelist.findIndex(d => d._id === dev._id); //find index in your array
        this.gamelist.splice(index, 1);
        this.gamelist.push(form.value);
        setTimeout(() => {
          this.succes,
          this.router.navigate(['/addGame']);
      }, 2000);  //5s
        this.resetForm(form);
      },
      err =>{
          this.errorMsg = 'something went wrong';
      }
    )
    }



  ngOnInit() {
    this.gamelist = [];
    this.complist = [];
    this.companyService.getCompanies()
       .subscribe(res => this.complist = res);
    this.gameService.getGames()
          .subscribe(res => this.gamelist = res);
  }

onSubmit(form : NgForm){
  console.log(form.value.gameName)
  this.gameService.addGame(form.value).subscribe(
    res =>{
      this.gamelist.push(form.value);
      this.succes = true;
      setTimeout(() => {
        this.succes,
        this.router.navigate(['']);
  }, 2000);  //5s
      this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}

resetForm(form: NgForm) {
  this.gameService.selectedGame = {
    gameName: '',
    gameDetails: '',
    gameImage: '',
    gameCompany: null
  };
  form.resetForm();
  this.errorMsg = '';
}



delete(id:string){
  this.gameService.deleteGame(id).subscribe(
    res =>{
      this.deleted = true;
      let index = this.gamelist.findIndex(d => d._id === id); //find index in your array
      this.gamelist.splice(index, 1);//remove element from array
      setTimeout(() => {
        this.succes,
        this.router.navigate(['/addGame']);
  }, 2000);  //5s
      //this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}
}
