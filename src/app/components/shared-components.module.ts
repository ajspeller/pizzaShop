import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { CartModalPageModule } from '../pages/cart-modal/cart-modal.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IonicModule, RouterModule, CartModalPageModule],
  exports: [HeaderComponent],
})
export class SharedComponentsModule {}
