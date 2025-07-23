import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Verb {
      present: string,
      past: string,
      participle : string,
      pronunciacion: string,
      espanol : string,
      type: string,
      finish: string
}
@Injectable({
  providedIn: 'root'
})
export class VerbDataService {

   constructor(private http: HttpClient) {}

  getVerbs(): Observable<Verb[]> {
    return this.http.get<Verb[]>('assets/verbs.json');
  }
}
