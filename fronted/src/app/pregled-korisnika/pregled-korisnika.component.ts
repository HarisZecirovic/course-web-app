import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-pregled-korisnika',
  templateUrl: './pregled-korisnika.component.html',
  styleUrls: ['./pregled-korisnika.component.css']
})
export class PregledKorisnikaComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.korsinici().subscribe(
      (response: User[]) => {
        console.log(response);
        this.users = response;
      }
    )
  }

  izbaciIzListe(id: string) {
    this.authService.izbrisiKorisnika(id).subscribe(
      response => {
        alert("Uspesno ste izbrisali korisnika");
        this.authService.korsinici().subscribe(
          (response: User[]) => {
            console.log(response);
            this.users = response;
          }

        )
      }
    )

  }

}
