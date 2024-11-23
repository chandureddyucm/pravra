import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ready-to-ship',
  templateUrl: './ready-to-ship.component.html',
  styleUrls: ['./ready-to-ship.component.scss']
})
export class ReadyToShipComponent {
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCategory: string = 'Ready To Ship';
  selectedType!: string;
  categories!: any[];
  types!: any[];
  showPriceFilter: boolean = false;

  filteredProducts: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getAllGifts();
  }

  getAllGifts() {
    this.apiService.getProductsByFilter(
      this.selectedCategory,
      this.selectedType,
      this.minPrice,
      this.maxPrice
    ).subscribe((response) => {
      this.filteredProducts = response.data;
      this.categories = [
        ...new Set(this.filteredProducts.map((gift) => gift.category)),
      ].map((category) => ({
        key: category, 
        label: category,
      }));
      this.types = [
        ...new Set(this.filteredProducts.map((gift) => gift.subcategory)),
      ].map((subcategory) => ({
        key: subcategory, 
        label: subcategory,
      }));
      this.types = [...this.types, { key: "All", label: "All" }];

      console.log(this.categories, this.types);
    });

    //this.selectedCategory = this.filteredProducts[0];
  }

  getProductsByFilter() {}
  filterCategory(category: string) {
    this.selectedCategory = category;
    this.selectedType = '';
    this.callAPI();
  }

  filterType(type: string) {
    this.selectedType = type=="All" ? '' : type;
    this.callAPI();
  }

  filterByPrice() {
    this.callAPI();
  }

  callAPI() {
    this.apiService
      .getProductsByFilter(
        this.selectedCategory,
        this.selectedType,
        this.minPrice,
        this.maxPrice
      )
      .subscribe((response) => {
        this.filteredProducts = response.data;
      });
  }

  addToCart(evt: any) {}
}
