import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  private http = inject(HttpClient);
  private apiurl = 'http://cooked-env.eba-tss6xgib.eu-north-1.elasticbeanstalk.com/tervehdys';
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl);
  }
}
