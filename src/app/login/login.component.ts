import { Component, OnInit, Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder,private router:Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    const crendentials = this.loginForm.value;

    this.authService.login(crendentials)
      .subscribe((sucess) => {
        this.snackBar.open('Login efetuado com sucesso', 'Ok', {duration:4000});
        this.subLoggedIn.next(true);
        this.authService.sucessfulLogin(sucess.headers.get('Authorization'));
        this.router.navigateByUrl('marcar-consulta');
      },

      (error) => {
        console.log(error);
        this.snackBar.open('Login ou senha inválido', 'Ok', {duration: 4000});
    });
  }
}
