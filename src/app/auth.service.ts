import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthToken} from "./auth-token";
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "./auth-response";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = "https://labjwt.zecer.wi.zut.edu.pl/api"

  constructor(private jwtHelperService: JwtHelperService, private httpClient: HttpClient) {

  }

  isAuthenticated() {
    return !this.jwtHelperService.isTokenExpired();
  }

  isAdmin() {
    if (this.isAuthenticated()) {
      const token = this.jwtHelperService.decodeToken() as AuthToken;
      return token && token.roles && token.roles.includes('ADMIN');
    }
    return false;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.baseURL + "/auth/login", {username, password}).pipe(
      tap(response => {
        console.debug('login() response', response);
        if (response.token) {
          localStorage.setItem('access_token', response.token);
        } else {
          localStorage.removeItem('access_token');
        }
      })
    )
  }

  getUsername(): string | null {
    const token = this.jwtHelperService.decodeToken() as AuthToken;
    return token?.sub;
  }

  logOut() {
    localStorage.removeItem("access_token");
  }
}
