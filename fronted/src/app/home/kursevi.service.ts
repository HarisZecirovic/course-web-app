import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../shared/video.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Kursevi } from './kursevi.model';
import { map, tap } from "rxjs";
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class KurseviService {
  private url = 'http://localhost/auth_app/api';

  user: User;

  userPodaci() {
    return this.user;
  }

  generiseUsera(user: User) {
    this.user = user;
  }

  kursevi: Kursevi[] = [
    new Kursevi(
      '0',
      '1',
      'javascript',
      'Java Script za pocetnike',
      'ovo je opis',
      '30',
      'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png',
      [
        new Video('Uvod', [{ nazivLekcije: 'ForPetlja', urlLekcije: 'mp4' }, { nazivLekcije: 'Instalacija', urlLekcije: 'mp4' }]),
        new Video('saa', [{ nazivLekcije: 'sdas', urlLekcije: 'sada' }])
      ]
    ),
    new Kursevi(
      '0',
      '1',
      'javascript',
      'Novo',
      'Novo',
      '10',
      'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png',
      [
        new Video('Uvod', [{ nazivLekcije: 'ForPetlja', urlLekcije: 'mp4' }, { nazivLekcije: 'Instalacija', urlLekcije: 'mp4' }]),
        new Video('saa', [{ nazivLekcije: 'sdas', urlLekcije: 'sada' }])
      ]
    )



  ];




  constructor(private slService: ShoppingListService, private http: HttpClient) { }



  fetchKurseve(kursevi: Kursevi[]) {
    let i = 0;
    let noviKurs: Kursevi[] = [];
    // noviKurs = new Kursevi(
    //   kurs.idKursa,
    //   kurs.id_user,
    //   kurs.tipKursa,
    //   kurs.imeKursa,
    //   kurs.opisKursa,
    //   kurs.cenaKursa,
    //   kurs.imageUrl,
    //   kurs.oblastiArray
    // )

    //this.kursevi.push(noviKurs);

    let oblastiArray: Video[] = []
    for (let kurs of kursevi) {
      oblastiArray = kurs.oblastiArray as Video[]
      let trenutniKurs: Kursevi = new Kursevi(
        kurs.idKursa,
        kurs.id_user,
        kurs.tipKursa,
        kurs.imeKursa,
        kurs.opisKursa,
        kurs.cenaKursa,
        kurs.imageUrl,
        oblastiArray
      )
      for (let oblasti of kurs.oblastiArray) {
        // trenutniKurs.oblastiArray  = [
        //   new Video(oblasti.oblast, [])
        // ]

        for (let lekcije of oblasti.lekcije) {
          //oblasti.lekcije = [{nazivLekcije: lekcije.nazivLekcije, urlLekcije: lekcije.urlLekcije}]
        }
      }

      noviKurs.push(trenutniKurs);
      i++;
    }

    this.kursevi = noviKurs;


    //this.kursevi = kursevi;






  }



  addKurs(kurs: Kursevi) {


    this.kursevi.push(kurs);
    console.log(this.kursevi);
  }

  updatujKurs(index: number, noviKurs: Kursevi) {
    this.kursevi[index] = noviKurs;
  }


  getRecipes() {
    return this.kursevi;
  }

  getRecipe(index: string) {
    let vratiKurs: Kursevi;
    for (let kurs of this.kursevi) {
      if (kurs.idKursa == index) {
        vratiKurs = kurs;

      }

    }
    return vratiKurs;

  }

  shoppingList(index: string) {
    for (let kurs of this.kursevi) {
      if (kurs.idKursa == index) {
        const vratiKurs = kurs
        this.slService.addKurs(vratiKurs);
      }

    }





  }

  izbrisiKurs(index: number) {
    this.kursevi.splice(index, 1);
  }



}
