import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators'
import { Kursevi } from '../home/kursevi.model';
import { KurseviService } from '../home/kursevi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost/auth_app/api';
  // private url = 'http://kursevi.epizy.com/api'
  // private url = 'https://udemykursevi.000webhostapp.com/api';
  // private url = 'https://udemykursevi.herokuapp.com/api';

  user = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient, private kurseviService: KurseviService) { }

  // login(credentials: User): Observable<any> {
  //   return this.http.post<{ token: string }>(`${this.url}/login.php`, credentials).pipe(
  //     map(response => response.token)

  //   )

  // }

  login(credentials: User) {
    return this.http.post(`${this.url}/login.php`, credentials);
  }

  registracija(user: { ime: string, prezime: string, username: string, password: string, tip: string }) {
    return this.http.post(`${this.url}/register.php`, user);
  }

  dodajKurs(kurs: Kursevi) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.post(`${this.url}/dodajKurs.php`, kurs, { headers });
  }

  prikaziKurseve() {
    return this.http.get(`${this.url}/dodajKurs.php`);





  }

  updatujKurs(kurs: Kursevi) {
    return this.http.put(`${this.url}/dodajKurs.php`, kurs);
  }

  izbrisiKurs(id: string) {
    return this.http.delete(`${this.url}/dodajKurs.php`, {
      params: new HttpParams().set('id', id)
    });

  }

  izmeniPodatke(user: { id: string; ime: string, prezime: string, username: string }) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.put(`${this.url}/izmeni-profil.php`, user, { headers });



  }

  kupiKurs(kursevi: Kursevi[]) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(`${this.url}/kupljeni-kursevi.php`, kursevi, { headers });
  }

  kupljeniKursevi() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.url}/kupljeni-kursevi.php`, { headers });
  }

  izmeniLozinku(lozinka: { staraLozinka: string, novaLozinka1: string, novaLozinka2: string }) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.put(`${this.url}/izmeni-lozinku.php`, lozinka, { headers });

  }
  napravljeniKursevi() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(`${this.url}/napravljeni-kursevi.php`, { headers });

  }

  emitujUsera() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let noviUser: User;


    this.http.get(`${this.url}/create.php`, { headers }).subscribe(
      (response: any) => {
        localStorage.setItem('tip', response.tip);

        this.user.next(response);
      }



    )



  }

  korsinici() {
    return this.http.get(`${this.url}/pregled-korisnika.php`);
  }

  izbrisiKorisnika(id: string) {
    return this.http.delete(`${this.url}/pregled-korisnika.php`, {
      params: new HttpParams().set('id', id)
    });

  }

  brojStudenata(id: string) {
    return this.http.get(`${this.url}/broj-studenata.php`, {
      params: new HttpParams().set('id', id)
    })

  }





}
