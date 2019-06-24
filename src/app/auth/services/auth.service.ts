import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Person} from "../../model/model.person";
import {UtilsString} from "../../utils/utils.string";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subUser$: BehaviorSubject<Person> = new BehaviorSubject<Person>(null);

  constructor(private http: HttpClient) { }

  register(person:Person): Observable<Person>{
    return this.http.post<Person>(`${UtilsString.baseUrlApi}/persons`, person);
  }

  login(credencials: {login:string, password:string}): Observable<Person>{
    return this.http
      .post<Person>(`${UtilsString.baseUrlApi}/login`, credencials)
      .pipe(
        tap((person: Person) => {
          localStorage.setItem("token", person.token);
          this.subLoggedIn$.next(true);
          this.subUser$.next(person);
        })
      )
  }

  logout(){

  }

  isAuthenticated(): Observable<boolean>{
    return this.subLoggedIn$.asObservable();
  }

  getPersons(): Observable<Person>{
    return this.subUser$.asObservable();
  }

}
