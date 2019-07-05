import { Component, OnInit, Injectable } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { ConsultaService } from 'src/service/consulta.service';
import { Appointment } from 'src/model/appointment/appointment.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.css']
})

export class MarcarConsultaComponent implements OnInit {
login: string;
appointment: Appointment;
appointments: Appointment[];
AppointmentNull: boolean = false;
apoName: string = '';
private unsubscribe$: Subject<any> = new Subject();


  constructor(private storage: StorageService, private consulta: ConsultaService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.login){
      this.login = localUser.login;
      this.showAllAppointmentsWithoutParameters();
    }
  }

  showAllAppointmentsWithoutParameters(){
    this.consulta.get() 
    .pipe( takeUntil(this.unsubscribe$))
    .subscribe((apos) => this.appointments = apos);
  }
    
  

  save(){
    if ( this.appointment) {
      this.consulta.update(
        {userDentist: this.apoName, _id: this.appointment._id})
        .subscribe(
          (sucess) => {
            console.log("Deu boa!");
          },
          (err) => {
            console.error(err);
          }
        )
    }
    else {
      this.consulta.addAppontments({userDentist: this.apoName})
      .subscribe(
        (dep) => {
          console.log(dep);
        },
        (err) => console.error(err))
    }
    this.clearFields();
  }

  clearFields(){

  }

}
