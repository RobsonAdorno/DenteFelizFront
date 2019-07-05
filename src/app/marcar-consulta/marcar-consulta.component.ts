import { Component, OnInit, Injectable } from '@angular/core';
import { StorageService } from 'src/service/storage.service';
import { ConsultaService } from 'src/service/consulta.service';
import { Appointment } from 'src/model/appointment/appointment.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.css']
})

// @ViewChild('form') form: NgForm;

export class MarcarConsultaComponent implements OnInit {
login: string;
appointment: Appointment;
appointments: Appointment[];
AppointmentNull: boolean = false;
apoName: string = '';
appointmentForm: FormGroup;
private unsubscribe$: Subject<any> = new Subject();

  constructor(private storage: StorageService, private consulta: ConsultaService, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.login){
      this.login = localUser.login;
      this.showAllAppointmentsWithoutParameters();
    }
  }

  createForm() {
    this.appointmentForm = this.fb.group({
      _id:[null],
      userDentist: ['', [Validators.required]],
      patient: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prescription: ['', [Validators.required]],
    });
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

  delete(dep: Appointment) {
    this.consulta.del(dep)
      .subscribe(
        () => this.notify('Removed!'),
        (err) => this.notify(err.error.msg)
      )
  }

  edit(dep: Appointment) {
    this.apoName = dep.userDentist;
    this.appointment = dep;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

}
