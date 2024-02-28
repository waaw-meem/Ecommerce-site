import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signUp } from '../data-type';
import { UserAuthServiceService } from './user-auth-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLoggin = false
  authError!:string

  constructor(private userService:UserAuthServiceService,private router:Router){}
  
  ngOnInit(): void {
    this.userService.reloadUser()
  }
  
  userAuth(data:signUp){
    this.userService.signUp(data)
  }

  userLogin(data:signUp){
    this.userService.userAuthLogin(data)
    this.userService.invalidUserAuth.subscribe((result) => {
      console.log(result)
      if(result){
        this.authError = 'Please enter valid email and password'
      }
    })
  }

  goToLogin(){
    this.showLoggin = true
  }

  goToSignUp(){
    this.showLoggin = false
  }
}
