import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}
