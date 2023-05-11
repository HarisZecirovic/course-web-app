import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListaKursevaComponent } from './home/lista-kurseva/lista-kurseva.component';
import { KurseviItemComponent } from './home/lista-kurseva/kursevi-item/kursevi-item.component';
import { KurseviDetaljiComponent } from './kursevi-detalji/kursevi-detalji.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppKurseviModule } from './app-kursevi.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { PrikaziVideoComponent } from './kursevi-detalji/prikazi-video/prikazi-video.component';
import { EditujKursComponent } from './edituj-kurs/edituj-kurs.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http'
import { RegistracijaComponent } from './registracija/registracija.component';
import { FilterPipe } from './home/filter.pipe';
import { IzmeniProfilComponent } from './izmeni-profil/izmeni-profil.component';
import { IzmeniLozinkuComponent } from './izmeni-profil/izmeni-lozinku/izmeni-lozinku.component';
import { KupljeniKurseviComponent } from './izmeni-profil/kupljeni-kursevi/kupljeni-kursevi.component';
import { SafePipe } from './kursevi-datalji/safe.pipe';
import { NapravljeniKurseviComponent } from './napravljeni-kursevi/napravljeni-kursevi.component';
import { PregledKorisnikaComponent } from './pregled-korisnika/pregled-korisnika.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ListaKursevaComponent,
    KurseviItemComponent,
    KurseviDetaljiComponent,
    PrikaziVideoComponent,
    DropdownDirective,
    EditujKursComponent,
    ShoppingListComponent,
    LoginComponent,
    RegistracijaComponent,
    FilterPipe,
    IzmeniProfilComponent,
    IzmeniLozinkuComponent,
    KupljeniKurseviComponent,
    SafePipe,
    NapravljeniKurseviComponent,
    PregledKorisnikaComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppKurseviModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
