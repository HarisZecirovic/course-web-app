import { Video } from "../shared/video.model";

export class Kursevi{
    public idKursa: string;
    public id_user: string;
    public tipKursa: string;
    public imeKursa: string;
    public opisKursa: string;
    public cenaKursa: string;
    public imageUrl: string;
    public oblastiArray: Video[];

    constructor(idKursa: string, id_user:string,tipKursa: string,imeKursa: string, opisKursa: string, cenaKursa: string, imageUrl: string, oblastiArray: Video[]){
        this.idKursa = idKursa;
        this.id_user = id_user;
        this.tipKursa = tipKursa;
        this.imeKursa = imeKursa;
        this.opisKursa = opisKursa;
        this.cenaKursa = cenaKursa;
        this.imageUrl = imageUrl;
        this.oblastiArray = oblastiArray;
    }
}