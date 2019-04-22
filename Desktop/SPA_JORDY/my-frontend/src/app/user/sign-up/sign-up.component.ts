import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../services/models/user.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
  constructor(private userService : UserService, private router: Router) { }
  succes:boolean;
  errorMsg:string;
  emaillist: any = [];
  emailsame :boolean;
  usernamesame: boolean;

  ngOnInit() {
    this.emaillist = [];
    this.userService.getUsers()
       .subscribe(res => this.emaillist = res);
  }

  onSubmit(form : NgForm){
    for(let o of this.emaillist){
    if(o.email == form.value.email ||o.fullName == form.value.fullName)
    {
      console.log('hello')
      this.emailsame = true;
      break;
    }
    else{
      this.emailsame = false;
    }
  }
  if (this.emailsame == false){
  this.userService.postUser(form.value).subscribe(
    res =>{
      this.succes = true;
      this.emaillist.push(form.value);
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
  else{
    this.errorMsg = 'you entered an existing email or username';
  }
}

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.errorMsg = '';
  }
}
