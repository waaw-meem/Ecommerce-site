import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order, product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number | undefined

  constructor(private productService:ProductService,
              private router:Router){}

  ngOnInit(): void {
    this.productService.getcartPage().subscribe((result:any) => {
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


    this.productService.OrderNow(orderData).subscribe((result) => {
      if(result){
        alert('Order Placed')
        this.router.navigate(['order-list'])
      }
    })
}
  }

}    