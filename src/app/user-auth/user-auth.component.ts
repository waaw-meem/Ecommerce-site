import { Component } from '@angular/core';
import { UserAuthServiceService } from './user-auth-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLoggin = false

  constructor(private userService:UserAuthServiceService){}
  
  userAuth(data:any){
  }

  goToLogin(){
    this.showLoggin = true
  }

  goToSignUp(){
    this.showLoggin = false
  }
}
