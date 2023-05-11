import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router"
import { EditujKursComponent } from "./edituj-kurs/edituj-kurs.component";
import { HomeComponent } from "./home/home.component";
import { IzmeniLozinkuComponent } from "./izmeni-profil/izmeni-lozinku/izmeni-lozinku.component";
import { IzmeniProfilComponent } from "./izmeni-profil/izmeni-profil.component";
import { KupljeniKurseviComponent } from "./izmeni-profil/kupljeni-kursevi/kupljeni-kursevi.component";
import { KurseviDetaljiComponent } from "./kursevi-detalji/kursevi-detalji.component";
import { PrikaziVideoComponent } from "./kursevi-detalji/prikazi-video/prikazi-video.component";
import { LoginComponent } from "./login/login.component";
import { NapravljeniKurseviComponent } from "./napravljeni-kursevi/napravljeni-kursevi.component";
import { PregledKorisnikaComponent } from "./pregled-korisnika/pregled-korisnika.component";
import { RegistracijaComponent } from "./registracija/registracija.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'detalji/:id', component: KurseviDetaljiComponent, children: [
        {path:':idKursa/:idOblasti/:url', component: PrikaziVideoComponent}
    ]},
    {path: 'new', component: EditujKursComponent},
    {path: 'edit/:id', component: EditujKursComponent},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registracija', component: RegistracijaComponent},
    {path: 'profil', component: IzmeniProfilComponent},
    {path: 'lozinka', component: IzmeniLozinkuComponent},
    {path: 'kupljeni-kursevi', component: KupljeniKurseviComponent},
    {path:'napravljeni-kursevi', component: NapravljeniKurseviComponent},
    {path: 'korisnici', component: PregledKorisnikaComponent}
    

    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppKurseviModule{

}