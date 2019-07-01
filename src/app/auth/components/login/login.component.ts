import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";
import { CredentialDTO } from 'src/app/model/credential/credential.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
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
        this.router.navigateByUrl('app/dashboard')
        this.snackBar.open(
          "Seja bem vindo!"
        ),{duration:2000};
      },

      (error) => {
        this.snackBar.open(
          "Login ou senha inválido!"
        ), {duration:2000};
    });
  }

  get password(): FormControl {return <FormControl> this.loginForm.get('password');}
}
