import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  username: string;
  password: string;
  errorMessage = "";
  constructor(private authService: AuthService) {
    this.username = "";
    this.password = "";
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  loginSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response && response.token) {
        this.errorMessage = '';
        this.username = '';
        this.password = '';
      } else {
        this.errorMessage = "Oops, something is wrong with your credentials."
      }
    });
  }
}
