import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { IProduct } from '../shared/iproduct';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  private _listFilter: string = "";
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log("In the ngOnInit() Method...");
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
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
