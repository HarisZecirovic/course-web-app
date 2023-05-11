import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  message: string =null;

  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.authService.registracija(form.value).subscribe(
      response => {
        
        alert("USPESNO STE NAPRAVILI NALOG");
        form.reset();
      }, error =>{
        this.message = error.error.message;
      }
    )
    


  }

}
