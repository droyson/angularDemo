import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs';

import { Item } from "../item/Item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private itemList$: Observable<Item[]>;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.itemList$ = this.homeService.getSelectedItems();
  }
}
