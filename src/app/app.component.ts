import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/model/model.person';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DenteFeliz';

  authenticated$ : Observable<boolean>;
  user$: Observable<Person>;

  constructor(
    private authService: AuthService, 
    private router: Router)  {
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getPersons();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
