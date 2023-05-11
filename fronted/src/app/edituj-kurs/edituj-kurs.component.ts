
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';

import { KurseviService } from '../home/kursevi.service';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-edituj-kurs',
  templateUrl: './edituj-kurs.component.html',
  styleUrls: ['./edituj-kurs.component.css']
})
export class EditujKursComponent implements OnInit {

  kursForm: FormGroup;
  id: string;
  editMode = false;

  //imageUrl: File = null;
  // urlLekcije: File = null;

  constructor(private fb: FormBuilder,
    private kurseviSerivce: KurseviService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    //iz url uzimam idKursa

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);

        this.initForm();


      }
    )





  }

  initForm() {
    const kurs = this.kurseviSerivce.getRecipe(this.id);
    let idKursa = "";
    let id_user = '';
    let tipKursa = "";

    let imeKursa = '';
    let opisKursa = '';
    let cenaKursa = '';
    let imageUrl = '';










    if (this.editMode) {
      idKursa = kurs.idKursa;
      id_user = kurs.id_user;
      tipKursa = kurs.tipKursa;
      imeKursa = kurs.imeKursa;
      opisKursa = kurs.opisKursa;
      cenaKursa = kurs.cenaKursa
      imageUrl = kurs.imageUrl;
      let i = -1;
      this.kursForm = this.fb.group({
        'idKursa': new FormControl(idKursa),
        'id_user': new FormControl(id_user),
        'tipKursa': new FormControl(tipKursa, Validators.required),
        'imeKursa': new FormControl(imeKursa, Validators.required),
        'opisKursa': new FormControl(opisKursa, Validators.required),
        'cenaKursa': new FormControl(cenaKursa, Validators.required),
        'imageUrl': new FormControl(imageUrl, Validators.required),
        'oblastiArray': this.fb.array([])
      })

      for (let oblast of kurs.oblastiArray) {
        this.dodajOblastEdit(oblast.oblast);
        i++;
        for (let lekcije of oblast.lekcije) {
          this.dodajLekcijuEdit(i, lekcije.nazivLekcije, lekcije.urlLekcije);


        }

      }
    }
    else {
      this.kursForm = this.fb.group({
        'idKursa': new FormControl(idKursa),
        'id_user': new FormControl(id_user),
        'tipKursa': new FormControl(tipKursa, Validators.required),
        'imeKursa': new FormControl(imeKursa, Validators.required),
        'cenaKursa': new FormControl(cenaKursa, Validators.required),
        'opisKursa': new FormControl(opisKursa, Validators.required),
        'imageUrl': new FormControl(imageUrl, Validators.required),
        'oblastiArray': this.fb.array([])
      })

      this.dodajOblast();
      this.dodajLekciju(0);
    }




  }

  oblasti(): FormArray {
    return this.kursForm.get('oblastiArray') as FormArray;
  }

  novaOblastEdit(oblast: string)
    : FormGroup {
    return this.fb.group({
      oblast: new FormControl(oblast, Validators.required),
      lekcije: this.fb.array([])

    })

  }
  dodajOblastEdit(oblast: string) {
    this.oblasti().push(this.novaOblastEdit(oblast))

  }
  novaLekcijaEdit(nazivLekcije: string, urlLekcije: string): FormGroup {
    return this.fb.group({
      nazivLekcije: new FormControl(nazivLekcije, Validators.required),
      urlLekcije: new FormControl(urlLekcije, Validators.required)
    })
  }


  dodajLekcijuEdit(indexOblasti: number, nazivLekcije: string, urlLekcije: string) {
    this.oblastiLekcije(indexOblasti).push(this.novaLekcijaEdit(nazivLekcije, urlLekcije));
  }

  novaOblast(): FormGroup {
    return this.fb.group({
      oblast: new FormControl(null, Validators.required),
      lekcije: this.fb.array([])

    })

  }

  dodajOblast() {
    this.oblasti().push(this.novaOblast())

  }

  obrisiOblast(indexOblasti: number) {
    this.oblasti().removeAt(indexOblasti)
  }

  oblastiLekcije(indexOblasti: number): FormArray {
    return this.oblasti().at(indexOblasti).get('lekcije') as FormArray;
  }

  novaLekcija(): FormGroup {
    return this.fb.group({
      nazivLekcije: new FormControl(null, Validators.required),
      urlLekcije: new FormControl(null, Validators.required)
    })
  }

  dodajLekciju(indexOblasti: number) {
    this.oblastiLekcije(indexOblasti).push(this.novaLekcija());
  }

  obrisiLekciju(indexOblasti: number, indexLekcije: number) {
    this.oblastiLekcije(indexOblasti).removeAt(indexLekcije);

    console.log("Ovo je index Oblasti " + indexOblasti + " ovo je index lekcije " + indexLekcije)
  }

  // uploadFile(event: any){
  //   this.imageUrl = event.target.files[0];




  // }
  uploadLekcija(event: any) {

  }

  onSubmit() {

    if (this.editMode) {
      this.authService.updatujKurs(this.kursForm.value).subscribe(
        (response) => {
          console.log(response);
          alert("Uspesno ste editovali kurs")
          this.router.navigate(['']);
        }, error => {
          alert(error.error.message);
          this.router.navigate(['/detalji', this.id])
        }
      )

    }
    else {
      this.authService.dodajKurs(this.kursForm.value).subscribe(
        response => {
          console.log(response);
          alert("Uspesno ste dodali kurs")
          this.router.navigate(['']);


        }
      )

    }


    // console.log(this.kursForm.get('oblastiArray'));

    // if (this.editMode) {
    //   this.kurseviSerivce.updatujKurs(this.id, this.kursForm.value);
    // }
    // else {
    //   this.kurseviSerivce.addKurs(this.kursForm.value);

    // }





  }
  onCancel() {
    this.kursForm.reset();
  }



}
