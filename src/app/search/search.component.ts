import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../seller-add-product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined | product[]

  constructor(private route:ActivatedRoute,private searchPage:ProductService){}

  ngOnInit(): void {
    let query = this.route.snapshot.params['query']
    query && this.searchPage.searchProducts(query).subscribe((data)=>{
      this.searchResult = data
    })
  }
}
