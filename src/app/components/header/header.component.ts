import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

import categoryData from './../../../assets/company/categories.json';
import { CartModalPage } from './../../pages/cart-modal/cart-modal.page';
import { CartService } from 'src/app/services/cart.service';

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

  darkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(
    private animationController: AnimationController,
    private cartService: CartService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cartService.getCartCount().subscribe((value) => {
      if (value > 0) {
        this.animateCart();
      }
      this.cartCount = value;
    });

    console.log(this.darkMode);
    this.toggleDarkmode(this.darkMode);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
      console.log('prefersDark eventlistener');
      const dark = e.matches ? true : false;
      if (this.darkMode !== dark) {
        this.darkMode = !this.darkMode;
        this.toggleDarkmode(this.darkMode);
      }
    });
  }

  toggleDarkmode(enable) {
    document.body.classList.toggle('dark', enable);
    console.log({
      isDark: enable,
      classes: document.body.classList.toString(),
    });
    this.darkMode = !this.darkMode;
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

  async openCart() {
    const modal = await this.modalController.create({
      component: CartModalPage,
      cssClass: 'custom-modal',
    });

    await modal.present();
  }
}
