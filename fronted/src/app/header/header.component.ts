import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KurseviService } from '../home/kursevi.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  dozvola = false;
  prijava = true;
  subscription: Subscription;
  dozvolaZaDropDown = false;
  tip: string;
  adminDozvola = false;
  dozvolaZaKurseve = false;


  constructor(private kurseviService: KurseviService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {


    this.subscription = this.authService.user.subscribe(
      (user: User) => {
        console.log(user);
        this.tip = localStorage.getItem('tip')

        if (user != null) {
          if (user.tip == 'autor') {
            this.dozvola = true;
          }
          if(user.tip =='admin'){
            this.dozvola = true;
            this.adminDozvola = true;

          }
          this.prijava = false;
          this.dozvolaZaDropDown = true;

        }

      }



    )
    if (this.tip != null) {
      if (this.tip == 'autor') {
        this.dozvola = true;
      }
      if(this.tip =='admin'){
        this.adminDozvola = true;

      }
      
      this.prijava = false;
      this.dozvolaZaDropDown = true;

    }

    





  }

  odjaviMe() {
    this.prijava = true;
    localStorage.removeItem('token');
    this.kurseviService.user = null;
    this.dozvolaZaDropDown = false;
    this.authService.user.next(null);
    this.router.navigate(['']);
    localStorage.clear();
    //location.reload();

  }

  prijaviMe() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
