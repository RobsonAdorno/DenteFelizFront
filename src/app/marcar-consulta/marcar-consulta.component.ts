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
    this.showAllAppointmentsWithoutParameters();

    if (localUser && localUser.login){
      this.login = localUser.login;
      
    }
  }

  createForm() {
    this.appointmentForm = this.fb.group({
      _id:[null],
      user: ['', [Validators.required]],
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
    if (this.appointment) {
      this.consulta.update(this.appointmentForm.value)
        .subscribe(
          (sucess) => {
            this.snackBar.open('Essa consulta já existe, atualizado com sucesso.', 'Ok', {duration: 4000});
            console.log(sucess);
          },
          (err) => {
            this.snackBar.open('Erro ao cadastrar a consulta.', 'Ok', {duration: 4000});
            console.error(err);
          }
        )
    }
    else {
      this.consulta.addAppontments(this.appointmentForm.value)
      .subscribe(
        (sucess) => {
          console.log(sucess);
          this.snackBar.open('Essa consulta cadastrada com sucesso.', 'Ok', {duration: 4000});
        },
        (err) => console.error(err))
        this.snackBar.open('Erro ao cadastrar a consulta.', 'Ok', {duration: 4000});
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
    this.apoName = dep.user;
    this.appointment = dep;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

}
