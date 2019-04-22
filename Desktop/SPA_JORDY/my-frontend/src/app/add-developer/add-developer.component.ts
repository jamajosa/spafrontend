import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../services/models/developer.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent implements OnInit {

  constructor(private developerService : DeveloperService, private router: Router) { }
  succes:boolean;
  errorMsg:string;
  deleted:boolean;
  developerlist: any = [];

  edit(dev: any,form: NgForm){
    if(form.value.name === "" || form.value.name === null ){
      form.value.name = dev.name
    }
    if(form.value.age === "" || form.value.age === null ){
      form.value.age = dev.age
    }
    this.developerService.editDeveloper(form.value, dev._id).subscribe(
      res =>{
        let index = this.developerlist.findIndex(d => d._id === dev._id); //find index in your array
        this.developerlist.splice(index, 1);
        this.developerlist.push(form.value);
        setTimeout(() => {
          this.succes,
          this.router.navigate(['/addDeveloper']);
      }, 2000);  //5s
        this.resetForm(form);
      },
      err =>{
          this.errorMsg = 'something went wrong';
      }
    )
    }



  ngOnInit() {
    this.developerlist = [];
    this.developerService.getDevelopers()
       .subscribe(res => this.developerlist = res);
  }

onSubmit(form : NgForm){
  this.developerService.addDeveloper(form.value).subscribe(
    res =>{
      this.developerlist.push(form.value);
      this.succes = true;
      setTimeout(() => {
        this.succes,
        this.router.navigate(['/addDeveloper']);
  }, 2000);  //5s
      this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}

resetForm(form: NgForm) {
  this.developerService.selectedDeveloper = {
    name: '',
    age: ''
  };
  form.resetForm();
  this.errorMsg = '';
}



delete(id:string){
  this.developerService.deleteDeveloper(id).subscribe(
    res =>{
      this.deleted = true;
      let index = this.developerlist.findIndex(d => d._id === id); //find index in your array
      this.developerlist.splice(index, 1);//remove element from array
      setTimeout(() => {
        this.succes,
        this.router.navigate(['/addDeveloper']);
  }, 2000);  //5s
      //this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}
}
