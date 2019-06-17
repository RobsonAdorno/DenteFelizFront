import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Persons } from '../../_models/persons';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  readonly baseUrl = "https://dentefeliz.herokuapp.com";

  constructor(private http: HttpClient) {}
    
    getPersons(): Observable<Persons[]>{
      return this.http.get<Persons[]>(`${this.baseUrl}/persons`)
      .pipe(
        catchError((error) => {
          return throwError(error)
        })
      )
   }
}
