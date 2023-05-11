import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { KurseviService } from '../home/kursevi.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private kurseviService: KurseviService) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(
      async (token: any) => {
        console.log(token.token);
        localStorage.setItem('token', token.token);

        const user: User = new User(token.id,
          token.ime,
          token.prezime,
          token.username,
          token.password,
          token.tip)

        this.kurseviService.generiseUsera(user);
        console.log(user);

        localStorage.setItem('username',user.username);
        localStorage.setItem('ime', user.ime);
        localStorage.setItem('prezime', user.prezime);
        this.authService.emitujUsera();
        this.router.navigate(['']);





      },
      async (response) => {
        alert("Netacna lozinka ili username");
        console.log(response)

      }
    );






  }

}
