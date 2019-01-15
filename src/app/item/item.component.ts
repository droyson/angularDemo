import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from './Item';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  increment() {
    if (this.item.quantity > 0) {
      this.item.selectedQuantity++;
      this.item.quantity--;
      this.homeService.setSelectedItems(this.item);
    }
  }

  decrement() {
    if (this.item.selectedQuantity > 0) {
      this.item.selectedQuantity--;
      this.item.quantity++;
      this.homeService.setSelectedItems(this.item);
    }
  }

}
