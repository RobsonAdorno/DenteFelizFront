import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLog$:Observable<boolean>;
  
  constructor(private login: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLog$ = this.login.isAuthenticated();
  }

  logout(){
    this.login.logout();
    this.router.navigateByUrl("login");
  }

}
