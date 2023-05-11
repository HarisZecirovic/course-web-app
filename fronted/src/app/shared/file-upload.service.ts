import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditujKursComponent } from '../edituj-kurs/edituj-kurs.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private url = 'http://localhost/auth_app/api/edituj.php';

  constructor(private http: HttpClient) { }

  upload(file):Observable<any>{
    const formData = new FormData();
    formData.append("file",file,file.name);

    return this.http.post(this.url, formData)
  }
}
