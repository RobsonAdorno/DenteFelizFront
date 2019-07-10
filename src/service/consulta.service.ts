import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { UtilsString } from 'src/utils/utils.string';
import { HttpClient } from '@angular/common/http';
import { Appointment } from 'src/model/appointment/appointment.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class ConsultaService{
private appointmentSubject$: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>(null);
private loaded: boolean = false;
private baseUrlAppointments: string = `${UtilsString.baseUrlApi}/appointments`;

    constructor(private http: HttpClient){}

    // findAllAppontments(): Observable<Appointment>{
    //     if (!this.loaded){
    //         this.http.get<Appointment>(this.baseUrlAppointments)
    //         .pipe( tap((appointments) => console.log(appointments)))
    //         .subscribe(this.appointmentSubject$);

    //         this.loaded = true;
    //     }
    //     return this.appointmentSubject$.asObservable();
    // }

    get(): Observable<Appointment[]> {
      if (!this.loaded) {
          this.http.get<Appointment[]>(this.baseUrlAppointments)
        .subscribe(this.appointmentSubject$);
        this.loaded = true;
      }
      return this.appointmentSubject$.asObservable();
    }

      del(dep: Appointment): Observable<any> {
        return this.http.delete(`${this.baseUrlAppointments}/${dep.id}`)
          .pipe( 
            tap(()=> {
              let ap = this.appointmentSubject$.getValue();
              let i = ap.findIndex(d => d.id === dep.id);
              if (i>=0)
                ap.splice(i,1);
            }
          ))
      }

    addAppontments(ap: Appointment): Observable<Appointment>  {
        return this.http.post<Appointment>(this.baseUrlAppointments, ap)
        .pipe(
          tap((dep) => {
            this.appointmentSubject$.getValue()
            .push({...ap, id: dep.id})
          }))
      }

      update(dep: Appointment): Observable<Appointment> {
        return this.http.patch<Appointment>(`${this.baseUrlAppointments}/${dep.id}`, dep)
          .pipe(
            tap((d) => {
              let departments = this.appointmentSubject$.getValue();
              let i = departments.findIndex(d => d.id === dep.id);
              if (i>=0)
                departments[i].user = d.user;
            })
          )
      }
}