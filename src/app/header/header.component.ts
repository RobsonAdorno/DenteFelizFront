import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLog:Observable<boolean>;
  
  constructor(private login: LoginComponent) { 
      this.isLog = this.login.subLoggedIn;
    }

  ngOnInit() {
    
  }

}
