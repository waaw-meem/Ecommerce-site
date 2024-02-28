import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  invalidUserAuth=new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }

  signUp(user:signUp){
    return this.http.post('http://localhost:3000/user',user,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  userAuthLogin(user:signIn){
    return this.http.get<signUp[]>(`http://localhost:3000/user?email=${user.email}&password=${user.password}`
    ,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body  && result.body?.length){
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
  
  reloadUser(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/'])
    }
  }
}
