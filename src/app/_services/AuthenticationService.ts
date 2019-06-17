import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Persons } from '../_models/persons';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentPersonsSubject: BehaviorSubject<Persons>;
    public currentPersons: Observable<Persons>;    

    constructor(private http: HttpClient) {
        this.currentPersonsSubject = new BehaviorSubject<Persons>(JSON.parse(localStorage.getItem('currentPersons')));
        this.currentPersons = this.currentPersonsSubject.asObservable();
    }

    public get currentPersonsValue(): Persons {
        return this.currentPersonsSubject.value;
    }

    login(login, password) {
        return this.http.post<any>(`${BaseUrl.urlApi}/login`, { login, password })
            .pipe(map(person => {
                localStorage.setItem('currentPerson', JSON.stringify(person));
                this.currentPersonsSubject.next(person);
                return person;
            }));
    }

    logout() {
        localStorage.removeItem('currentPersons');
        this.currentPersonsSubject.next(null);
    }
}