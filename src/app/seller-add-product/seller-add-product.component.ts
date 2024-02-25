import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  // Functionality to add product by using subscriber
  addNewProductMessage:string | undefined

  constructor(private products:ProductService){}

  addNewProduct(data:product){
    this.products.addProducts(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.addNewProductMessage = 'Product Add Successfully'
      }

      setTimeout(() => {
        this.addNewProductMessage = undefined;
      }, 3000);
    })
  }

  
}
