import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary, product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {
  cartDataInfo:cart[] | undefined
  pricesummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  constructor(private productService:ProductService,
              private router:Router){}
  
  ngOnInit(): void {
    this.loadDetails()
  }

  checkoutRouting(){
    this.router.navigate(['checkout'])
  }

  removeCart (cartId: string | undefined){
    cartId && this.cartDataInfo && this.productService.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails()
    // let user = localStorage.getItem('user');
    // let userId= user && JSON.parse(user).id;
    // this.productService.getCartList (userId)
    })
    }

    loadDetails(){
      this.productService.getcartPage().subscribe((result:any) => {
        this.cartDataInfo = result
        var price = 0;
        result.forEach((item:product) => {
        if(item.quantity){
          price = price + (+item.price * item.quantity);
        }
  });
      this.pricesummary.price=price;
      this.pricesummary.discount=price/10;
      this.pricesummary.tax=price/10;
      this.pricesummary.delivery=100;
      this.pricesummary.total=price+(price/10)+100-(price/10);

      if (!this.cartDataInfo || !this.cartDataInfo.length) {
        this.router.navigate(['/']);
      }
      
      })

    }

}
