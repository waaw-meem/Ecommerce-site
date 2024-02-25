import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signUp } from '../data-type';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLoggin = false
  authError:string=''

  constructor(private sellerSignup:SellerService,
              private router:Router){}
  
  signUp(data:signUp){
    this.sellerSignup.userSignUp(data)
  }

  signIn(data:signIn){
    this.sellerSignup.userLogin(data)
    this.sellerSignup.isLoggInError.subscribe((isError)=> {
      if(isError){
        this.authError = 'Email or Password is incorrect'
      }
    })
  }

  ngOnInit(): void {
    this.sellerSignup.reloadSeller()
  }

  goToLogin(){
    this.showLoggin = true
  }

  goToSignUp(){
    this.showLoggin = false
  }

}


// .subscribe((response) => {
//   if(response){
//     this.router.navigate(['seller-home'])
//   }
// })