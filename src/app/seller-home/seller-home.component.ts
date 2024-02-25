import { Component, OnInit } from '@angular/core';
import { ProductService } from '../seller-add-product/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productArray:undefined | product[]
  deleteMessage:string | undefined

  constructor(private getProduct:ProductService){}

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList(){
    this.getProduct.getProducts().subscribe((result) => {
      this.productArray = result
    })
  }

  deleteSingleProduct(id:string){
    this.getProduct.deleteProduct(id).subscribe((result) => {
      if(result){
        this.deleteMessage = 'Product Delete Successfully'
        this.getProductList()
      }

    })
    setTimeout(() => {
      this.deleteMessage = undefined;
    }, 3000);

  }

}
