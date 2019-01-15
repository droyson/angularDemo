import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Item } from '../item/Item';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://5a12745f748faa001280a746.mockapi.io/v1/stores/item';
  private _selectedItems: Item[] = [];
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(this._selectedItems);

  constructor(private http: HttpClient) { }

  getSelectedItems() {
    return this.itemsSubject.asObservable();
  }

  setSelectedItems(item: Item) {
    let selectedItemIndex = this._selectedItems.findIndex(selectedItem => selectedItem.id === item.id);
    if (item.selectedQuantity > 0) {
      if (selectedItemIndex > -1) {
        this._selectedItems.splice(selectedItemIndex, 1, item);
      } else {
        this._selectedItems.push(item);
      }
    } else {
      if (selectedItemIndex > -1) {
        this._selectedItems.splice(selectedItemIndex, 1);
      }
    }
    this.itemsSubject.next(this._selectedItems);
  }

  clearSelectedItems(){
    this._selectedItems.splice(0);
    this.itemsSubject.next(this._selectedItems);
  }

  getList(): Observable<Item[]> {
    return this.http.get(this.url).pipe(
      map((response: any[]) => response.map(item => new Item(item)))
    );
  }
}
