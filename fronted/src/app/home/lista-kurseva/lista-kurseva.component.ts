import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Kursevi } from '../kursevi.model';
import { KurseviService } from '../kursevi.service';

@Component({
  selector: 'app-lista-kurseva',
  templateUrl: './lista-kurseva.component.html',
  styleUrls: ['./lista-kurseva.component.css']
})
export class ListaKursevaComponent implements OnInit {
  kursevi: Kursevi[];
  filteredStatus = '';
  tip = '';
  sortiranje= '';
  

  constructor(private kurseviService: KurseviService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.prikaziKurseve().subscribe(
      (response: any) => {
        let noviKurs: Kursevi[] = response.response;
        let i = 0;
        //  for(let kurs in noviKurs){
        //   this.kurseviService.fetchKurseve(noviKurs[i++]);
        //  }

        console.log(this.kurseviService.kursevi);
        
        this.kurseviService.fetchKurseve(noviKurs);


        //this.kurseviService.fetchKurseve(response.response[1]);


        this.kursevi = this.kurseviService.getRecipes();
        console.log(this.kursevi);
      }
    )

        // this.kursevi = this.kurseviService.getRecipes();
        // console.log(this.kursevi);

    



  }

}
