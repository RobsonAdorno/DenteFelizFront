import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(8))
  });

  constructor(
    //private fb: FormBuilder, 
    private authService: LoginService,
    private router: Router,
    // private snackBar: MatSnackBar
    ){}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
    .subscribe(
      (sucess) => {
        
      },
      (error) => {

      });
  }
}
