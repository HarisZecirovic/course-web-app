import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Kursevi } from 'src/app/home/kursevi.model';
import { KurseviService } from 'src/app/home/kursevi.service';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-prikazi-video',
  templateUrl: './prikazi-video.component.html',
  styleUrls: ['./prikazi-video.component.css']
})
export class PrikaziVideoComponent implements OnInit {

  url: string;

  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  idOblasti: string;
  idKursa: string;
  kursevi: Kursevi;
  urlLekcije: string;

  constructor(private route: ActivatedRoute,
    private fileService: FileUploadService,
    private kurseviService: KurseviService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idKursa = params['idKursa'];
        this.idOblasti = params['idOblasti'];
        this.url = params['url'];
        this.kursevi = this.kurseviService.getRecipe(this.idKursa);

        this.urlLekcije = this.kursevi.oblastiArray[this.idOblasti].lekcije[this.url].urlLekcije;


        //console.log('IdKursa ' + this.idKursa +' IdOblasti: ' + this.idOblasti, " idLekcije " + this.url);
        console.log(this.urlLekcije);
      }
    );


  }

  onUpload() {

    console.log(this.file);

    this.fileService.upload(this.file).subscribe(
      (event: any) => {

        console.log(event);
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    )

    this.loading = !this.loading;


  }

  onChange(event) {
    this.file = event.target.files[0];



  }

}
