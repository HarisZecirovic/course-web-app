import { Component, OnInit } from '@angular/core';
import { Kursevi } from 'src/app/home/kursevi.model';
import { KurseviService } from 'src/app/home/kursevi.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-kupljeni-kursevi',
  templateUrl: './kupljeni-kursevi.component.html',
  styleUrls: ['./kupljeni-kursevi.component.css']
})
export class KupljeniKurseviComponent implements OnInit {

  kupljeniKursevi = [];
  kursevi: Kursevi[] = [];
  noviKursevi: Kursevi[] = [];

  i = 0;

  constructor(private authService: AuthService,
    private kurseviService: KurseviService) { }

  ngOnInit(): void {
    this.authService.kupljeniKursevi().subscribe(
      (response: any) => {

        this.kupljeniKursevi = response;
        console.log(this.kupljeniKursevi);
        this.kursevi = this.kurseviService.getRecipes();
        for(let kurs of this.kupljeniKursevi){
          const dobijeniKurs = this.kurseviService.getRecipe(kurs.idKursa);
          this.noviKursevi.push(dobijeniKurs as Kursevi);

        }
      }
    )




  }

}
