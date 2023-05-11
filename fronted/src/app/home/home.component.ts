import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { Kursevi } from './kursevi.model';
import { KurseviService } from './kursevi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  dozvola = false;
  user: User;
  filteredStatus = '';
  subscription: Subscription;
  tip: string;

  constructor(private router: Router, private kurseviService: KurseviService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // this.kurseviService.prikaziKurseve().subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // )
    this.subscription = this.authService.user.subscribe(
      (response: User) =>{
        if(response != null){
          if(response.tip === 'autor' || response.tip == 'admin'){
            this.dozvola = true;
          }
          else{
            this.dozvola = false;
          }
        }
        else{
          this.dozvola = false;
        }
      }
    )
    this.tip = localStorage.getItem('tip');
    if(this.tip!= null){
      if(this.tip == 'autor' || this.tip == 'admin'){
        this.dozvola = true;

      }else{
        this.dozvola = false;
      }
    }


  




  }

  dodajKurs() {
    this.router.navigate(['new']);

  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
