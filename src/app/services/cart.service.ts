import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = {};
  private cartItems = new BehaviorSubject(0);
  constructor() {}

  addProduct(product: Product) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = { amount: 1, ...product };
    } else {
      this.cart[product.id].amount += 1;
    }

    this.cartItems.next(this.cartItems.value + 1);
  }

  getCartCount() {
    return this.cartItems.asObservable();
  }

  getCart() {
    const cartItem = [];
    for (const [key, value] of Object.entries(this.cart)) {
      cartItem.push(value);
    }
    return cartItem;
  }
}
