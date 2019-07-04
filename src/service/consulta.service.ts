import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { UtilsString } from 'src/utils/utils.string';
import { HttpClient } from '@angular/common/http';
import { Appointment } from 'src/model/appointment/appointment.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class ConsultaService{
private appointmentSubject$: BehaviorSubject<Appointment> = new BehaviorSubject<Appointment>(null);
private loaded: boolean = false;
private baseUrlAppointments: string = `${UtilsString.baseUrlApi}/appointments`;

    constructor(private http: HttpClient){}

    findAllAppontments(): Observable<Appointment>{
        if (!this.loaded){
            this.http.get<Appointment>(this.baseUrlAppointments)
            .pipe( tap((appointments) => console.log(appointments)))
            .subscribe(this.appointmentSubject$);

            this.loaded = true;
        }
        return this.appointmentSubject$.asObservable();
    }

    addAppontments(ap: Appointment): Observable<Appointment>  {
        return this.http.post<Appointment>(this.baseUrlAppointments, ap)
        .pipe(
          tap((dep: Appointment) => this.appointmentSubject$.getValue()))
      }
}