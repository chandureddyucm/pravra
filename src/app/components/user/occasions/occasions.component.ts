import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { addGift } from 'src/app/models/gift';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-occasions',
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.scss'],
})
export class OccasionsComponent {
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCategory: string = 'Occasions';
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
    category: 'Occasions',
    subcategory: '',
    price: 0,
    availability: true,
    imageSrc: ''
  };

  filteredProducts: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getAllGifts();
    this.isAdmin = localStorage.getItem('isAdmin') == 'true' ? true : false;

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

  saveProductDetails(giftId:string = '') {
    if(!this.edit){
      delete this.product.giftId;
      const formData = new FormData();
      for (const key in this.product) {
        if (this.product.hasOwnProperty(key) && key !== 'imageSrc') {
          formData.append(key, this.product[key as keyof addGift] as string);
        }
      }
      formData.append('image', this.imageFile);
      this.apiService.addGift(formData).subscribe((resp)=>{
        this.getAllGifts();
      });
    }
    else{
      const formData = new FormData();
      for (const key in this.product) {
        if (this.product.hasOwnProperty(key) && key !== 'imageSrc') {
          formData.append(key, this.product[key as keyof addGift] as string);
        }
      }
      formData.append('image', this.imageFile);
      this.apiService.updateGift(formData, giftId).subscribe((resp)=>{
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

    const fileInput = document.getElementById('productImage') as HTMLInputElement;
    fileInput.value = '';
  }

  addProduct(){
    this.product.name = '';
    this.product.description = '';
    this.product.price = 0;
    this.product.subcategory = '';
    this.edit = false;

    const fileInput = document.getElementById('productImage') as HTMLInputElement;
    fileInput.value = '';
  }

  imageFile!: File; 
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0]; 
    }
  }

}