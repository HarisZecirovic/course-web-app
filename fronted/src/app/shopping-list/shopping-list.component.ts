import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Kursevi } from '../home/kursevi.model';
import { AuthService } from '../shared/auth.service';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  kursevi: Kursevi[];
  private listaIzmenjena: Subscription;
  ukupnaCena: number;

  constructor(
    private slService: ShoppingListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.kursevi = this.slService.getKursevi();

    this.listaIzmenjena = this.slService.listaPromenjena.subscribe(
      (kursevi: Kursevi[]) => {
        this.kursevi = kursevi;
        this.ukupnaCena = 0;
        if (this.kursevi === null) {
          this.kursevi = [];
        }
        if (this.kursevi) {
          for (let kurs of this.kursevi) {
            this.ukupnaCena = this.ukupnaCena + +kurs.cenaKursa;
          }
          console.log(this.ukupnaCena);
        }
      }
    );
  }

  izbaciIzListe(index: number) {
    this.slService.izbaciIzShoppingListe(index);
  }
  kupi() {
    this.authService.kupiKurs(this.kursevi).subscribe((response) => {
      console.log(response);
      this.kursevi = [];
      alert('USPESNO SE OBAVILI KUPOVINU');
    });

    this.slService.listaPromenjena.next(null);
  }

  ngOnDestroy(): void {
    this.listaIzmenjena.unsubscribe();
  }
}
