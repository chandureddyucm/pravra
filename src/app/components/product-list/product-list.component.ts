import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    { name: 'Gift Hampers', price: 99, image: 'assets/giftHampers.jpg' },
    { name: 'Corporate Gifts', price: 149, image: 'assets/corporateGifts.jpg' },
    { name: 'Engrave Your Story', price: 89, image: 'assets/engravingGifts.jpg' },
    { name: '{Engrave Your Story}', price: 89, image: 'assets/engravingGifts.jpg' },
    { name: '{Gift Hampers}', price: 99, image: 'assets/giftHampers.jpg' },
    { name: '{Corporate Gifts}', price: 149, image: 'assets/corporateGifts.jpg' },
  ];
}
