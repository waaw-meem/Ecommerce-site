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
 searchProductResult: product[] = [];

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
     }else{
       console.log('Not Working')
       this.menuType = 'default'
     }
    }
   })
 }

  // Functionality For LogOut
 logOut(){
  localStorage.removeItem('seller')
  this.router.navigate(['/'])
 }

 // Search Product API
 searchProduct(event: Event): void {
  const query = (event.target as HTMLInputElement).value.trim();
  if (query) {
    this.searchAPI.searchProducts(query).subscribe((data: product[]) => {
      this.searchProductResult = data;
    });
  } else {
    this.searchProductResult = [];
  }
}

hideSearchBar(){
  this.searchProductResult = []
}


}
