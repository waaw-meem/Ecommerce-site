import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signIn, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSuccessLogin = new BehaviorSubject<boolean>(false)
  isLoggInError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,
              private router:Router) { }

  userSignUp(data:signUp){
    const result =  this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result) => {
      this.router.navigate(['seller-home'])
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.isSuccessLogin.next(true)
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller'))
    {
      this.isSuccessLogin.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data:signIn){
    const result =  this.http
    .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`
    ,{observe:'response'})
    .subscribe((result:any) => {
     if(result && result.body && result.body.length){
      console.log(result)
      // console.log(result.body)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
     }else{
      console.log('User Login Failed')
      this.isLoggInError.emit(true)
     }
    })
  }
}
