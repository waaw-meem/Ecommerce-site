import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerSignup:SellerService,
              private router:Router){}
  
  signUp(data:signUp){
    this.sellerSignup.userSignUp(data)
  }

  ngOnInit(): void {
    this.sellerSignup.reloadSeller()
  }
}


// .subscribe((response) => {
//   if(response){
//     this.router.navigate(['seller-home'])
//   }
// })