import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import productData from './../../../assets/company/menu.json';
import categoryData from './../../../assets/company/categories.json';
import { Product } from 'src/app/models/product.interface';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private modalController: ModalController
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

  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      handle: false,
      componentProps: { categories: categoryData },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.filterProducts(data.category?.slug);
    }
  }
}
