import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import categoryData from './../../../assets/company/categories.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  dropdown = false;
  categories = categoryData;

  constructor() {}

  ngOnInit() {}

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
}
