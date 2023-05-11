import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Kursevi } from '../home/kursevi.model';
import { KurseviService } from '../home/kursevi.service';
import { ActivatedRoute, Params, Router } from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../shared/user.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-kursevi-detalji',
  templateUrl: './kursevi-detalji.component.html',
  styleUrls: ['./kursevi-detalji.component.css']
})
export class KurseviDetaljiComponent implements OnInit, OnDestroy {
  kurs: Kursevi;
  id: string;
  dozvola = false;
  user: User;
  mojiKursevi: Kursevi[];
  kupljeniKursevi: Kursevi[];
  kursevi: Kursevi[];
  tip: string;
  enrolovaniStudenti: string;
  private listaIzmenjena: Subscription;


  dozvolaZaGledanje = false;
  dozvolaZaKorpu = true;


  constructor(private kurseviService: KurseviService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.kurs = this.kurseviService.getRecipe(this.id);
      }
    )
    this.authService.napravljeniKursevi().subscribe(
      (response: any) => {
        this.mojiKursevi = response;

        for (let kurs of this.mojiKursevi) {
          if (kurs.idKursa == this.id) {
            this.dozvola = true;
            this.dozvolaZaGledanje = true;
          }
        }


      }
    )
    this.authService.user.subscribe(
      (user: User) => {
        if (user.tip == 'admin') {
          this.dozvola = true;
          this.dozvolaZaGledanje = true;

        }
      }
    )
    this.tip = localStorage.getItem('tip');

    if (this.tip == 'admin') {
      this.dozvola = true;
      this.dozvolaZaGledanje = true;

    }


    this.authService.kupljeniKursevi().subscribe(
      (response: any) => {
        this.kupljeniKursevi = response;

        for (let kurs of this.kupljeniKursevi) {
          if (kurs.idKursa == this.id) {
            this.dozvolaZaGledanje = true;
            this.dozvolaZaKorpu = false;
          }
        }

      }
    )
    this.kursevi = this.slService.getKursevi();

    this.listaIzmenjena = this.slService.listaPromenjena.subscribe(
      (kursevi: Kursevi[]) => {
        this.kursevi = kursevi;
        for (let kurs of this.kursevi) {
          if (kurs.idKursa == this.id) {

            this.dozvolaZaKorpu = false;
          }
        }

      }
    )

    this.authService.brojStudenata(this.id).subscribe(
      (response: string) => {
        console.log(response);
        this.enrolovaniStudenti = response;

      }
    )



  }

  prikaziVideo(idKursa: string, idOblasti: number, url: number) {
    //let noviUrl = this.sanitizer.bypassSecurityTrustUrl(url);

    this.router.navigate([idKursa, idOblasti, url], { relativeTo: this.route })


  }

  editujKurs() {
    this.router.navigate(['/edit', this.id]);
  }



  dodajUShoppingListu() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    this.http.post(`http://localhost/auth_app/api/create.php`, 'body', { headers }).subscribe(
      (response: any) => {
        this.kurseviService.shoppingList(this.id);
        console.log(response.id);

      },
      () => {
        alert("Morate biti prijavljeni");
      }
    )





  }


  izbrisiKurs() {
    //this.kurseviService.izbrisiKurs(this.id);

    this.authService.izbrisiKurs(this.kurs.idKursa).subscribe(
      (response) => {
        console.log(response);
        console.log("Uspesno ste obrisali kurs");
        this.router.navigate([""]);
      }

    )
  }

  ngOnDestroy(): void {
    this.listaIzmenjena.unsubscribe();
  }


}
