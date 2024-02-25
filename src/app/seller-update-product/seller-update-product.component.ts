import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../seller-add-product/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined|product
  addNewProductMessage:string | undefined

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit(): void {
    let productID = this.route.snapshot.params['id']
    console.log(productID)

    productID && this.product.getSingleProduct(productID).subscribe((result) => {
      console.log(result)
      this.productData = result
    })
  }

  addNewProduct(data:product){
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.addNewProductMessage = 'Update Product'
      }
    })
    setTimeout(() => {
      this.addNewProductMessage = undefined;
    }, 3000);
  }


}
