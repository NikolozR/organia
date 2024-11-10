import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: HttpClient) { }

  GetFooterData() {
    return this.http.get('/assets/server/footer.json')
  }
}
