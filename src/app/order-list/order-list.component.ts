import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  userCartData:order[] | undefined
 
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getOrderList();
    }
    cancelorder(orderId: string | undefined) {
    orderId && this.productService.cancelProductOrder(orderId).subscribe((result)=>{
    this.getOrderList();
    })
    }
    getOrderList(){
    this.productService.orderList().subscribe((result)=>{
    this.userCartData=result;
    })
    }

}
