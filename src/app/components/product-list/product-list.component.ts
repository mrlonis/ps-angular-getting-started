import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = "";
  sub!: Subscription;

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  private _listFilter: string = "";
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log("In the ngOnInit() Method...");
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    console.log("Received event from a nested component! Event Message: " + message);
    this.pageTitle = "Product List: " + message;
  }

  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("listFilter(): Value = ", value);
    this.filteredProducts = this.performFilter(value);
  }

}
