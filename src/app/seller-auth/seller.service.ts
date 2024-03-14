import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signIn, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // BEHAVIOUR SUBJCT IS ADDED TO ENSURE ABOUT SUCCESS LOGIN
  isSuccessLogin = new BehaviorSubject<boolean>(false)

  isLoggInError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,
              private router:Router) { }

  // SIGNUP FUNCTION  API
  userSignUp(data:signUp){
    // Making a POST request to the specified URL ('http://localhost:3000/seller') using Angular's HttpClient service
    // Subscribing to the Observable returned by the HTTP POST request
    const result =  this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result) => {
    // When the response is received:
    // Navigate to the 'seller-home' route using Angular's Router service
      this.router.navigate(['seller-home'])
      // Store the response body (seller data) into local storage after converting it to a JSON string
      localStorage.setItem('seller',JSON.stringify(result.body))
      // Emit a success signal using a BehaviorSubject or Subject
      this.isSuccessLogin.next(true)
    })
  }

  // RELOADING SELLER
  // Method to reload the seller's information
  reloadSeller(){
    // Check if seller information is stored in local storage
    if(localStorage.getItem('seller'))
    {
      // If seller information is found:
      // Emit a success signal using isSuccessLogin BehaviorSubject
      // This notifies subscribers that the seller is logged in successfully
      this.isSuccessLogin.next(true)

    // Navigate to the 'seller-home' route using Angular's Router service
    // This redirects the user to the seller's home page
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data:signIn){
    const result =  this.http
    .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`
    ,{observe:'response'})
    .subscribe((result:any) => {
     if(result && result.body && result.body.length){

      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
     }else{
      console.log('User Login Failed')
      this.isLoggInError.emit(true)
     }
    })
  }
}
