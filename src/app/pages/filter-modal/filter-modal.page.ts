import { TitleService } from './../../services/title.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
  @Input() categories: any[];
  constructor(
    private modalController: ModalController,
    private titleService: TitleService
  ) {}

  ngOnInit() {}

  selectCategory(cat) {
    this.modalController.dismiss({ category: cat });
    this.titleService.setCurrentTitle(cat ? cat.title : null);
  }
}
