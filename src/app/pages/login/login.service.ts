import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthLayoutPerson } from "src/app/layouts/auth-layout/auth-layout.person";

@Injectable({
    providedIn: 'root'
})

export class LoginService{
    private 
    
    constructor(private http: HttpClient){}

    login(credentions: {login:string, password:string}): Observable<AuthLayoutPerson>{
        return this.http.post<AuthLayoutPerson>(`${Urls.apiUrl}/login`, credentions);
    }
}