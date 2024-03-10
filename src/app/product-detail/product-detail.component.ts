import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
parseInt(arg0: string): number {
throw new Error('Method not implemented.');
}
  singleProductDetail:undefined | product
  productQauntity:number=1

  // REMOVE BUTTON FUNCTIONALITY BOOLEAN VALUE
  removeCart = false

  constructor(private route:ActivatedRoute,private productService:ProductService){}

  ngOnInit(): void {
    let productID = this.route.snapshot.params['productId']
    productID && this.productService.getSingleProduct(productID).subscribe((data)=>{
      console.log(productID)
      this.singleProductDetail = data
    })

    // REMOVE CART DATA FUNCTIONALITY 
    // INITIALIZE THE LOCALCART IN CARTDATA
    let cartData = localStorage.getItem('localCart')
    // IF PRODUCT ID AND CART DATA IS TRUE OR AVAILABLE
    if(productID && cartData){
      // THEN CONVERT CARTDATA LOCALCART AND ASSIGN IN ITEMS
      let items = JSON.parse(cartData)
      // FILTRATION IN ITEM ID
      items = items.filter((item:product) => productID == item.id)
      // ITEMS LENGTH IS GREATER THEN 0
      if(items.length){
        this.removeCart = true
      }else{
        this.removeCart = false
      }
    }
    
  }

  handleButton(val:string){
    if(this.productQauntity<50 && val==='plus'){
      this.productQauntity += 1
    }else if(this.productQauntity>1 && val==='minus'){
      this.productQauntity -= 1
    }
  }

 
  // ADD TO CART FUNCTION
  addToCart() {
    // IF PRODUCT IS AVAILABLE THEN
    if(this.singleProductDetail){
      // QUANTITY IS NOT PRESENT IN DATA TYPE FILE WE ALSO ADD IN THAT FILE
      // SINGLE PRODUCT QUANTITY IS EQUAL TO PRODUCTQUANTITY VARIABLE
      this.singleProductDetail.quantity = this.productQauntity;
      // IF USER IS NOT LOGGEDIN 
      if(!localStorage.getItem('user')){
      // THEN CALL LOCALADDTOCART API WHICH IS PRODUCT SERVICE  
      this.productService.localAddToCart(this.singleProductDetail);

      this.removeCart=true
      }
      // IF USER IS LOGGEDIN THEN
      else{
      // USER IS STORED IN LOCAL STORAGE WILL ASSIGN IN USER VAR
      let user = localStorage.getItem('user');
      // USER ID
      let userId=user && JSON.parse(user).id;
      console.log("user id is this",userId)
      // CREATE CARTDATA OBJECT WHICH CONTAIN INFOR ABOUT PRODUCT AND USER
      // USER WHICH USER ADD DATA IN CART
      let cartData:cart={
      ...this.singleProductDetail,
      productId: this.singleProductDetail.id,
      userId
      }
      console.log(cartData)
      // DELETE ID FROM CART OBJECT TO PREVENT FROM MISUNDERSTANDING
      delete cartData.id;
      // CALLING API TO SAVE IN DB FILE DATA AFTER LOGIN
      this.productService.cartProductInsertion(cartData).subscribe((result)=>{
        if(result){
          console.log('Product ADDED')
          // this.productService.getCartList(userId);
          // this.removeCart = true

        }
      })
    }
  }
}

  // REMOVE CART FUNCTION
  removeToCart(productIdString: string){
    // const productId = parseInt(productIdString, 10); // Convert string to number
    this.productService.removeCart(productIdString);

    this.removeCart = false

}
}