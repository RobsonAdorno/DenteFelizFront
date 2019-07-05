import { Component, OnInit, Injectable } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { ConsultaService } from 'src/service/consulta.service';
import { Appointment } from 'src/model/appointment/appointment.model';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.css']
})

export class MarcarConsultaComponent implements OnInit {
login: string;
appointment: Appointment;
isAppointmentNull: boolean = false;

  constructor(private storage: StorageService, private consulta: ConsultaService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.login){
      this.login = localUser.login;
      this.showAllAppointmentsWithoutParameters();
    }
  }

  showAllAppointmentsWithoutParameters(){
    this.consulta.findAllAppontments().subscribe(
      (sucess) => {
        if (!sucess){
          this.isAppointmentNull = true;
        }
    },
      (error) => {
        console.log(error);
    });
  }

}
