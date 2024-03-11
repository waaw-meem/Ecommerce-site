import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // In Angular, EventEmitter is a class used to create and emit custom events within components or services. 
  // It's primarily used for parent-child communication or cross-component communication.

  // you're creating an instance of EventEmitter named cartData. 
  // The generic type <product[] | []> specifies the type of data that the EventEmitter can emit. 
  // In this case, it can emit either an array of product objects (product[]) or an empty array ([]).
  cartCounterCustomEvent = new EventEmitter<product[] | []>()

  // API calling for Post Products
  constructor(private http:HttpClient) { }

  addProducts(data:product){
    return this.http.post('http://localhost:3000/products',data)
  }

  getProducts(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getSingleProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProducts(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query:string): Observable<product[]> {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  // ADD TO CART IN LOCAL STORAGE
  localAddToCart(data:product){
    // CART PLACED IN ARRAY
    let cartData = []
    // INITIALIZE LOCALCART VARIABLE TO GET ITEM FROM LOCAL STORAGE
    // IF LOCAL STORAGE DOES NOT CONTAIN LOCALCART DATA
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      // THEN IT SET DATA IN LOCAL STORAGE
      localStorage.setItem('localCart', JSON.stringify([data]))
    }else{
     // OTHERWISE LOCALCART BE PARSED AND IT IS ADDED IN CART DATA VAR
     // JSON.parse() is a built-in JavaScript function that converts a JSON string into a JavaScript object.
     cartData = JSON.parse(localCart)
     // ADD DATA WHICH IS ALREADY ADDED IN LOCALCART AND PUSHED IN CARTDATA
     cartData.push(data)
     // THEN IT SET DATA IN LOCAL STORAGE IN STRINGIFY FORMAT
     localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    // CALLING EVENT EMITTER WITH THE HELP OF EMIT FUNCTION
    this.cartCounterCustomEvent.emit(cartData)
  }


  // REMOVE CART API
  removeCart(id: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
        // IF CART DATA IS PRESENT OR TRUE THEN WI DECLARE ITEMS VARIABLE
        // AND GIVE TYPE AS A PRODUCT
        let items: product[] = JSON.parse(cartData);

        items = items.filter((item: product) => id !== item.id);

        localStorage.setItem('localCart', JSON.stringify(items))
        this.cartCounterCustomEvent.emit(items)
    }
}

  // CART PRODUCT ADD IN DB.JSON FILE
  cartProductInsertion(cartDataInsert:cart){
    return this.http.post('http://localhost:3000/cart',cartDataInsert)
  }

  // FUNCTION FOR GETTING PRODUCTS ACCORDING TO THE USERS
  // getCartList(userId:string){
  //   return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
  //   {observe:'response'}).subscribe((result)=>{
  //     console.log(result)
  //     if(result && result.body){
  //       this.cartCounterCustomEvent.emit(result.body)
  //     }
  //   })
  // }
}
