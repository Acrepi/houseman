import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab-f';

  constructor(private authService: AuthService) {

  }

  canAccessUsers() {
    return this.authService.isAdmin();
  }

  canAccessItems() {
    return this.authService.isAuthenticated();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  logOut() {
    this.authService.logOut();
  }
}
