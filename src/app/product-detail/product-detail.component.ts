import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  singleProductDetail:undefined | product
  productQauntity:number=1

  constructor(private route:ActivatedRoute,private productService:ProductService){}

  ngOnInit(): void {
    let productID = this.route.snapshot.params['productId']
    productID && this.productService.getSingleProduct(productID).subscribe((data)=>{
      console.log(productID)
      this.singleProductDetail = data
    })
    
  }

  handleButton(val:string){
    if(this.productQauntity<50 && val==='plus'){
      this.productQauntity += 1
    }else if(this.productQauntity>1 && val==='minus'){
      this.productQauntity -= 1
    }
  }
}
