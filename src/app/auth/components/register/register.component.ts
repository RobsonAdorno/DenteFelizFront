import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {Person} from '../../../model/model.person';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    cro: ['', [Validators.required]],
    login: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchingPasswords});


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;

      if (password1 === password2)return null;
    }
    return {matching: false};
  }

  onSubmit() {
    console.log(this.formRegister.value);

    const person: Person = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1};
    this.authService.register(person)
      .subscribe(

        (sucess) => {
          this.snackBar.open(
            'Registro feito com sucesso!',
            'OK', {duration: 2000});
          this.router.navigateByUrl('auth/components/login');
        },

        (err) => {
          console.error(err);
          this.snackBar.open(err.error.message, 'OK', {duration: 2000});
        });
  }

}
