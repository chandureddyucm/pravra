import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addGift } from 'src/app/models/gift';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-build-a-box',
  templateUrl: './build-a-box.component.html',
  styleUrls: ['./build-a-box.component.scss'],
})
export class BuildABoxComponent {
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCategory: string = 'Build A Box';
  selectedType!: string;
  categories!: any[];
  types!: any[];
  showPriceFilter: boolean = false;
  isAdmin: boolean = false;
  edit: boolean = false;
  product:addGift = {
    giftId: '',
    name: '',
    description: '',
    category: 'Build A Box',
    subcategory: '',
    price: 0,
    availability: true,
    imageSrc: ''
  };

  filteredProducts: any[] = [];
  boxItems: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
  ) {
    this.isAdmin = localStorage.getItem('isAdmin') == 'true' ? true : false;
    this.getAllGifts();
  }

  getAllGifts() {
    this.apiService
      .getProductsByFilter(
        this.selectedCategory,
        this.selectedType,
        this.minPrice,
        this.maxPrice
      )
      .subscribe((response) => {
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
        this.types = [...this.types, { key: 'All', label: 'All' }];

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
    this.selectedType = type == 'All' ? '' : type;
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

  addToBox(evt: any) {
    evt.quantity = 1;
    if (!this.boxItems.some(item => item.giftId === evt.giftId)) {
      this.boxItems = [...this.boxItems, evt];
    }
    this.sweetAlertService.showSuccessToast("Item Added to box Successfully");
    console.log(this.filteredProducts, this.boxItems, evt);
  }

  // Function to increase quantity
  increaseQuantity(item: any): void {
    item.quantity++;
  }

  // Function to decrease quantity
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Calculate total price
  calculateTotal(): number {
    return this.boxItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }


  saveProductDetails(giftId:string = '') {
    if(!this.edit){
      delete this.product.giftId;
      this.apiService.addGift(this.product).subscribe((resp)=>{
        this.getAllGifts();
      });
    }
    else{
      this.apiService.updateGift(this.product, giftId).subscribe((resp)=>{
        this.getAllGifts();
      });
    }
    
    console.log('Product details saved:', this.product);
  }

  editProduct(product: any){
    this.product.name = product.name;
    this.product.description = product.description;
    this.product.subcategory = product.subcategory;
    this.product.price = product.price;
    this.product.giftId = product.giftId;
    this.edit = true;
  }

  addProduct(){
    this.product.name = '';
    this.product.description = '';
    this.product.price = 0;
    this.product.subcategory = '';
    this.edit = false;
  }
}
