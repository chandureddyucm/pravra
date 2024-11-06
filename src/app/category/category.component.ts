import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // Sample data for products
  products = [
    { title: 'Instant Gift A', category: 'instant-gifts', price: 50, rating: 4.5, image: 'assets/corporateGifts.jpg' },
    { title: 'Customize Gift B', category: 'customize-gifts', price: 80, rating: 4.8, image: 'assets/corporateGifts.jpg' },
    { title: 'Corporate Gift C', category: 'corporate-gifts', price: 120, rating: 4.2, image: 'assets/corporateGifts.jpg' },
    { title: 'Engraving Gift D', category: 'engraving-gifts', price: 70, rating: 4.7, image: 'assets/corporateGifts.jpg' },
    { title: 'Instant Gift E', category: 'instant-gifts', price: 40, rating: 4.0, image: 'assets/corporateGifts.jpg' },
    { title: 'Customize Gift F', category: 'customize-gifts', price: 90, rating: 5.0, image: 'assets/corporateGifts.jpg' },
    { title: 'Corporate Gift G', category: 'corporate-gifts', price: 150, rating: 4.3, image: 'assets/corporateGifts.jpg' },
    { title: 'Engraving Gift H', category: 'engraving-gifts', price: 60, rating: 4.6, image: 'assets/corporateGifts.jpg' },
  ];

  filteredProducts = [...this.products]; // Holds filtered and sorted products

  constructor() { }

  ngOnInit(): void {
  }

  // Filter products by category
  filterCategory(category: string): void {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }

  // Sort products based on selected option (price or rating)
  sortProducts(event: any): void {
    const value = event.target.value;
    if (value === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (value === 'rating') {
      this.filteredProducts.sort((a, b) => b.rating - a.rating);
    }
  }

  // Placeholder functions for add to cart and customize
  addToCart(product: any): void {
    console.log(`Added ${product.title} to cart`);
  }

  customizeGift(product: any): void {
    console.log(`Customizing gift: ${product.title}`);
  }
}
