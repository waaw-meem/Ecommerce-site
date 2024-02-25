import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../seller-add-product/product.service';
import { product } from '../data-type'; // Assuming Product is the correct interface/type for a single product

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  trendProduct: undefined | product[];

  popularProducts: product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((result: product[]) => {
      this.popularProducts = result;
    });

    this.productService.trendyProducts().subscribe((data)=>{
      this.trendProduct = data
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const carouselElement = document.querySelector('#carouselExampleDark');
      if (carouselElement) {
        const carouselInstance = new bootstrap.Carousel(carouselElement, {
          interval: 5000
        });
      }
    });
  }
}
