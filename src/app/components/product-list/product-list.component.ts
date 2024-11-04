import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    { name: 'Rose & Lily Bouquet', price: 99, image: 'assets/flower1.jpg' },
    { name: 'Luxury Orchid Hamper', price: 149, image: 'assets/flower2.jpg' },
    { name: 'Sunflower Delight', price: 89, image: 'assets/flower3.jpg' },
  ];
}
