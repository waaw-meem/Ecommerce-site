import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number | undefined
  // REMOVING CART ITEM IN CHECKOUT
  cartDataInCheckOut:cart[] | undefined
  orderMessage:string | undefined

  constructor(private productService:ProductService,
              private router:Router){}

  ngOnInit(): void {
    this.productService.getcartPage().subscribe((result:any) => {

      // REMOVING CART ITEM IN CHECKOUT
      this.cartDataInCheckOut = result

      let price =0
      result.forEach((item:product) => {
      if(item.quantity){
        price = price + (+item.price * +item.quantity);
      }
   });
    this.totalPrice=price+(price/10)+100-(price/10);
    })
  }

  proceedNow(data:{name:string,email:string}){
    console.log(data)
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;

    if(this.totalPrice){
    let orderData:order={
    ...data,
    totalPrice: this.totalPrice,
    userId,
    id:undefined
    }

    // REMOVING CART ITEM IN CHECKOUT
    this.cartDataInCheckOut?.forEach((item) => {
     setTimeout(() => {
      if (item && item.id) {
        this.productService.removeCartItemsFromCheckout(item.id);
      }
     },700)
    })

    this.productService.OrderNow(orderData).subscribe((result) => {
      if(result){
        // REMOVING CART ITEM IN CHECKOUT
        this.orderMessage = "Your Order has been placed"
        setTimeout(() => {
          this.orderMessage = undefined
          this.router.navigate(['order-list'])
         },4000)
      }
    })
}
  }

}    