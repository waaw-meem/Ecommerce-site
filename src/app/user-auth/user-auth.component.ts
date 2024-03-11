import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, product, signIn, signUp } from '../data-type';
import { UserAuthServiceService } from './user-auth-service.service';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLoggin = false
  authError!:string

  constructor(private userService:UserAuthServiceService,private router:Router,
              private productService:ProductService){}
  
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
      }else{
        this.localCartToRemoteCart()
      }
    })
  }

  goToLogin(){
    this.showLoggin = true
  }

  goToSignUp(){
    this.showLoggin = false
  }

  // FUNCTION TO CONNECT LOCALCART WHICH IS SAVED IN LOCAL STORAGE
  localCartToRemoteCart(){
    // DATA IS STORED IN LOCAL STORAGE
    let data = localStorage.getItem('localCart');
    // DATA IS STORED IN LOCAL STORAGE RELATED TO USER
    let userInfo = localStorage.getItem('user');
    // DATA IS STORED IN LOCAL STORAGE RELATED TO USER
    let userId = userInfo && JSON.parse(userInfo).id;

    // IF DATA IS PRESENT OR TRUE
    if(data){

      // Parse the JSON string stored in the 'data' variable into an array of 'product' objects
      let cartDataList: product[] = JSON.parse(data);

      // Iterate over each 'product' object in the 'cartDataList' array
      cartDataList.forEach((product: product, index) => {
      // Create a new 'cart' object using the spread operator to copy all properties of the 'product' object
        let cartData: cart = {
          ...product,
          userId,
          productId: product.id
        };
        delete cartData.id;
      
      // CALLING API FOR INSERTION DATA
      this.productService.cartProductInsertion(cartData).subscribe((result) => {
        if(result){
          console.log('Working properly');
        }
      });
      if(cartDataList.length === index + 1){
        localStorage.removeItem('localCart');
      }
        
      });
    }

  //  setTimeout(() => {
  //   this.productService.getCartList(userId)
  //  }, 200);
  }
  
}
