import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart = [];
  cartSum = 0;

  constructor(
    private cartService: CartService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartSum = this.cart.reduce(
      (val, item) => (val += +item.price * +item.amount),
      0
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
