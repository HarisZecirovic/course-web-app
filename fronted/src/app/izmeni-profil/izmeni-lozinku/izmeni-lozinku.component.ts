import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-izmeni-lozinku',
  templateUrl: './izmeni-lozinku.component.html',
  styleUrls: ['./izmeni-lozinku.component.css']
})
export class IzmeniLozinkuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.authService.izmeniLozinku(form.value).subscribe(
      response => {
        console.log(response);
      }
    )

  }

}
