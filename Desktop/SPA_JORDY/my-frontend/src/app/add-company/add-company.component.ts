import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../services/models/company.model';
import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../services/models/developer.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private developerService : DeveloperService, private companyService : CompanyService, private router: Router) { }
  succes:boolean;
  errorMsg:string;
  comp:any;
  deleted:boolean;
  devList: any = [];
  companylist: any = [];
  developerlist: any = [];

  rowclicked(a:any){
    this.comp = a;
  }

  edit(dev: any,form: NgForm){
    form.value.companyDeveloper = this.devList;
    if(form.value.companyName === "" || form.value.companyName === null ){
      form.value.companyName = dev.companyName
    }
    if(form.value.companyAge === "" || form.value.companyAge === null ){
      form.value.companyAge = dev.companyAge
    }
    if(form.value.companyDeveloper == 0){
      form.value.companyDeveloper = dev.companyDeveloper
    }

    this.companyService.editCompany(form.value, dev._id).subscribe(
      res =>{
        let index = this.companylist.findIndex(d => d._id === dev._id); //find index in your array
        this.companylist.splice(index, 1);
        this.companylist.push(form.value);
        setTimeout(() => {
          this.succes,
          this.router.navigate(['/addCompany']);
      }, 2000);  //5s
        this.resetForm(form);
      },
      err =>{
          this.errorMsg = 'something went wrong';
      }
    )
    }



  ngOnInit() {
    this.companylist = [];
    this.developerlist = [];
    this.companyService.getCompanies()
       .subscribe(res => this.companylist = res);
    this.developerService.getDevelopers()
        .subscribe(res => this.developerlist = res);

  }

  addOrRemove(id: Developer){
    console.log(id);
      if(this.devList.includes(id)){
        let index = this.devList.findIndex(d => d._id === id); //find index in your array
        this.devList.splice(index, 1);
      }
      else{
        this.devList.push(id);
        console.log(this.devList);

    }
  }

onSubmit(form : NgForm){
  form.value.companyDeveloper = this.devList;
  this.companyService.addCompany(form.value).subscribe(
    res =>{
      this.companylist.push(form.value);
      this.succes = true;
      setTimeout(() => {
        this.succes,
        this.router.navigate(['/addCompany']);
  }, 2000);  //5s
      this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}

resetForm(form: NgForm) {
  this.companyService.selectedCompany = {
    companyName: '',
    companyAge: ''
  };
  form.resetForm();
  this.errorMsg = '';
}



delete(id:string){
  this.companyService.deleteCompany(id).subscribe(
    res =>{
      this.deleted = true;
      let index = this.companylist.findIndex(d => d._id === id); //find index in your array
      this.companylist.splice(index, 1);//remove element from array
      setTimeout(() => {
        this.succes,
        this.router.navigate(['/addCompany']);
  }, 2000);  //5s
      //this.resetForm(form);
    },
    err =>{
        this.errorMsg = 'something went wrong';
    }
  );
}



}
