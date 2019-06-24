import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    const crendentials = this.loginForm.value;

    this.authService.login(crendentials)
      .subscribe((sucess) => {
        this.snackBar.open(
          "Seja bem vindo!"
        );
      },

      (error) => {
        this.snackBar.open(
          "Login ou senha inválido!"
        );
    });
  }

  get password(): FormControl {return <FormControl> this.loginForm.get('password');}
}
