import { Component, OnInit } from '@angular/core';
import { Kursevi } from '../home/kursevi.model';
import { KurseviService } from '../home/kursevi.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-napravljeni-kursevi',
  templateUrl: './napravljeni-kursevi.component.html',
  styleUrls: ['./napravljeni-kursevi.component.css']
})
export class NapravljeniKurseviComponent implements OnInit {

  kupljeniKursevi = [];
  kursevi: Kursevi[] = [];
  noviKursevi: Kursevi[] = [];

  i = 0;

  constructor(private authService: AuthService,
    private kurseviService: KurseviService) { }

  ngOnInit(): void {
    this.authService.napravljeniKursevi().subscribe(
      (response: any) => {
        this.kupljeniKursevi = response;
        console.log(this.kupljeniKursevi);
        this.kursevi = this.kurseviService.getRecipes();
        for (let kurs of this.kupljeniKursevi) {
          const dobijeniKurs = this.kurseviService.getRecipe(kurs.idKursa);
          this.noviKursevi.push(dobijeniKurs as Kursevi);

        }
        console.log(response);
      }
    )


  }

}
