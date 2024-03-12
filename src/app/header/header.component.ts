import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../seller-add-product/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
 // Functionality For Changing NavBar
 menuType:string = 'default'
 sellerName!:string
 userName!:string
 searchProductResult:undefined | product[]

 cartItem = 0

 constructor(private router:Router,private searchAPI:ProductService){}

 ngOnInit(): void {
   this.router.events.subscribe((val:any) => {
    if(val.url){
     if(localStorage.getItem('seller') && val.url.includes('seller')){
       console.log('Working')
       this.menuType = 'seller'

       if(localStorage.getItem('seller')){
        const sellerInfo = localStorage.getItem('seller')
        // Parse the retrieved data as JSON if it exists, and access the first element of the resulting array
        const sellerData = sellerInfo && JSON.parse(sellerInfo)[0]
        this.sellerName = sellerData.name
       }
     }else if(localStorage.getItem('user')){
      const userInfo = localStorage.getItem('user')
      // Parse the retrieved data as JSON if it exists, and access the first element of the resulting array
      const userData = userInfo && JSON.parse(userInfo)[0]
      this.userName = userData.name
      this.menuType = 'user'

      // TO SHOW CART COUNTER AS IT IS AT HOME
      this.searchAPI.getCartList(userData.id)
     }
     else{
       console.log('Not Working')
       this.menuType = 'default'
     }
    }
   })

   // ADDING DYNAMIC COUNT
   // ADDING LOCALCART IF IT IS PRESENT IT IS ASSIGN IN LOCALCARTINFORMATION
   let localCartInformation = localStorage.getItem('localCart')
   // IF LOCAL CART INFORMATION IS AVAILABLE MEANS THAT IF LOCALCART IS PRESENT THEN
   if(localCartInformation){
    // THIS TECHNIQUE WILL WORK BUT THERE IS ONE ISSUE
    // WHEN USER ADD DATA IT WILL NOT INCREASE COUNT UNTIL USER REFRESH THE PAGE
    // THIS SCENERIO IS BAD PRACTICE TO USER EXPERIENCE
    this.cartItem = JSON.parse(localCartInformation).length
   }

   // TO OVERCOME THE ABOVE SCENERIO WE ADD THIS FUNCTIONALITY FROM SERVICE 
   this.searchAPI.cartCounterCustomEvent.subscribe((items) => {
    // CARTITEM VALUE CHANGE ACCORDING TO THE LENGTH OF THE ITEM
    this.cartItem = items.length
   })
 }

  // Functionality For LogOut
 logOut(){
  localStorage.removeItem('seller')
  this.router.navigate(['/'])
 }

 userLogout(){
  localStorage.removeItem('user')
  this.router.navigate(['/'])

  // FIXING CART COUNTER
  // THIS STATEMENT WE USED TO SET CART COUNTER ZERO AFTER LOGOUT
  this.searchAPI.cartCounterCustomEvent.emit([]) 
 }


 searchProduct(query:KeyboardEvent){
  if(query){
    const element = query.target as HTMLInputElement
    this.searchAPI.searchProducts(element.value).subscribe((data) => {
      console.log(data)
      if(data.length>5){
        data.length = 5
      }
      this.searchProductResult = data
    })
  }
 }

 hideSearch(){
  this.searchProductResult = undefined
 }

 searchValue(val:string){
  this.router.navigate([`search/${val}`])
 }

 redirectToSearch(id:string){
  this.router.navigate(['/search/'+id])
 }

 
}
