import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Kursevi } from '../home/kursevi.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: Kursevi[] = [];
  listaPromenjena = new BehaviorSubject<Kursevi[]>(null);
  // listaPromenjena = new Subject<Kursevi[]>();

  constructor() {}

  addKurs(kurs: Kursevi) {
    this.shoppingList.push(kurs);
    this.listaPromenjena.next(this.shoppingList.slice());
  }

  getKursevi() {
    return this.shoppingList.slice();
  }

  izbaciIzShoppingListe(index: number) {
    this.shoppingList.splice(index, 1);
    this.listaPromenjena.next(this.shoppingList.slice());
  }
}
