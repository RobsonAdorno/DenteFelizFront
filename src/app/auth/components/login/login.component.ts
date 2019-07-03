import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router, private authService: AuthService) {}

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
        this.authService.sucessfulLogin(sucess.headers.get('Authorization'));
          this.router.navigateByUrl('app/dashboard')
      },

      (error) => {
        console.log(error);
    });
  }

  get password(): FormControl {return <FormControl> this.loginForm.get('password');}
}
