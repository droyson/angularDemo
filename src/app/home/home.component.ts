import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';

import { Item } from "../item/Item";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemList$: Observable<Item[]>;

  constructor(private service: HomeService) { }

  ngOnInit() {
    this.itemList$ = this.service.getList();
    this.service.clearSelectedItems();
  }

}
