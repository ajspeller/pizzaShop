import { CartService } from 'src/app/services/cart.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

import categoryData from './../../../assets/company/categories.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  @ViewChild('cartbtnweb', { read: ElementRef }) cartBtnWeb: ElementRef;
  @ViewChild('cartbtnmobile', { read: ElementRef }) cartBtnMobile: ElementRef;
  dropdown = false;
  categories = categoryData;
  cartCount = 0;

  constructor(
    private animationController: AnimationController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getCartCount().subscribe((value) => {
      if (value > 0) {
        this.animateCart();
      }
      this.cartCount = value;
    });
  }

  hideDropdown(evt: MouseEvent) {
    const { clientX: xTouch, clientY: yTouch } = evt;

    const rect: DOMRect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoudary = rect.left + 2;
    const rightBoundary = rect.right - 2;

    if (
      xTouch < leftBoudary ||
      xTouch > rightBoundary ||
      yTouch < topBoundary
    ) {
      this.dropdown = false;
    }
  }

  animateCart() {
    const keyframes = [
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' },
    ];

    const cartAnimationWeb = this.animationController
      .create('web')
      .addElement(this.cartBtnWeb.nativeElement)
      .duration(600)
      .keyframes(keyframes);

    cartAnimationWeb.play();

    const cartAnimationMobile = this.animationController
      .create('mobile')
      .addElement(this.cartBtnMobile.nativeElement)
      .duration(600)
      .keyframes(keyframes);

      cartAnimationMobile.play();
  }
}
