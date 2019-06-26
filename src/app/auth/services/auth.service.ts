import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Person} from "../../model/model.person";
import {UtilsString} from "../../utils/utils.string";
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subUser$: BehaviorSubject<Person> = new BehaviorSubject<Person>(null);

  constructor(private http: HttpClient) { }

  register(person: Person): Observable<Person> {
    return this.http.post<Person>(`${UtilsString.baseUrlApi}/persons`, person);
  }

  login(credencials: {login: string, password: string}): Observable<Person> {
    return this.http
      .post<Person>(`${UtilsString.baseUrlApi}/login`, credencials)
      .pipe(
        tap((person: Person) => {
          localStorage.setItem('token', person.token);
          this.subLoggedIn$.next(true);
          this.subUser$.next(person);
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.subLoggedIn$.next(false);
    this.subUser$.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.subLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http
      .get<Person>(`${UtilsString.baseUrlApi}/persons`)
      .pipe(
        tap((person: Person) => {
          if (person) {
            localStorage.setItem('token', person.token);
            this.subLoggedIn$.next(true);
            this.subUser$.next(person);
          }
        }),

        map((person: Person) => (person) ? true : false),

        catchError((err) => {
          this.logout();
          return of(false);
        }));
  }

  getPersons(): Observable<Person>{
    return this.subUser$.asObservable();
  }

}
