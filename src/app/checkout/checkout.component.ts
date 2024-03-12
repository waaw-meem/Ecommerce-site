import { Component, OnInit } from '@angular/core';
import { checkout, product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number | undefined

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.productService.getcartPage().subscribe((result:any) => {
      let price =0
      result.forEach((item:product) => {
      if(item.quantity){
        price = price + (+item.price * item.quantity);
      }
   });
    this.totalPrice=price+(price/10)+100-(price/10);
    })
  }

  orderNow(data:{email:string,name:string}){
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;

    if(this.totalPrice){
    let orderData:checkout={
    ...data,
    totalPrice: this.totalPrice,
    userId
    }
    this.productService.OrderNow(orderData).subscribe((result) => {
      if(result){
        alert('Order Placed')
      }
    })

}
  }
}    