import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemsList} from "./items-list";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = "https://labjwt.zecer.wi.zut.edu.pl/api"

  constructor(private httpClient: HttpClient) {

  }

  items() {
    return this.httpClient.get<ItemsList>(this.baseURL + "/items");
  }

  users() {
    return this.httpClient.get<User[]>(this.baseURL + "/users");
  }
}
