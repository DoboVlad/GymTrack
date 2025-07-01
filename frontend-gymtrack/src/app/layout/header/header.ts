import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(protected authService: AuthService, private router: Router) { }

  loggout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
