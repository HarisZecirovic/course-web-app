import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { KurseviService } from '../home/kursevi.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-izmeni-profil',
  templateUrl: './izmeni-profil.component.html',
  styleUrls: ['./izmeni-profil.component.css']
})
export class IzmeniProfilComponent implements OnInit, OnDestroy {
  @ViewChild('profilForm', { static: true }) signupForm: NgForm;

  profilForm: FormGroup;
  id = '';
  ime = '';
  prezime = '';
  username = '';
  subscription: Subscription;

  constructor(private fb: FormBuilder,
    private kurseviService: KurseviService,
    private authService: AuthService) { }
  ngOnInit(): void {
    this.initForm();

    this.authService.user.subscribe(
      response => {
        console.log(response);
        this.profilForm.get('ime').setValue(response.ime);
        this.profilForm.get('prezime').setValue(response.prezime);
        this.profilForm.get('username').setValue(response.username);

      }
    );








  }



  initForm() {

    const user = this.kurseviService.userPodaci();
    //console.log(user);
    let username1 = localStorage.getItem('username');
    let ime1 = localStorage.getItem('ime');
    let prezime1 = localStorage.getItem('prezime');


    // if (user != null) {
    //   this.id = user.id;
    //   this.ime = user.ime;
    //   this.prezime = user.prezime;
    //   this.username = user.username;

    // }


    this.profilForm = this.fb.group({
      'id': new FormControl(this.id),
      'ime': new FormControl(ime1),
      'prezime': new FormControl(prezime1),
      'username': new FormControl(username1, Validators.required)

    })

  }





  onSubmit() {

    this.authService.izmeniPodatke(this.profilForm.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);

        const user: User = new User(response.id,
          response.ime,
          response.prezime,
          response.username,
          response.password,
          response.tip)

        this.kurseviService.generiseUsera(user);
        this.authService.emitujUsera();
        this.profilForm.get('ime').setValue(response.ime);
        this.profilForm.get('prezime').setValue(response.prezime);
        this.profilForm.get('username').setValue(response.username);


          alert("USPESNO STE IZENILI PODATKE");
        console.log(response);
      }



    )





  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
