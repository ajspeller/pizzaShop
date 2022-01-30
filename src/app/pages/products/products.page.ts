import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import productData from './../../../assets/company/menu.json';
import categoryData from './../../../assets/company/categories.json';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterProducts(params.category);
    });
  }

  filterProducts(category = null) {
    if (!category) {
      this.products = productData;
    } else {
      // eslint-disable-next-line eqeqeq
      const cat = categoryData.filter((item) => item.slug == category)[0];
      // eslint-disable-next-line eqeqeq
      this.products = productData.filter((p) => p.category == cat.id);
    }
  }

  addProduct(product: Product) {
    this.cartService.addProduct(product);
  }
}
