import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Client } from '../_models';
let apiUrl: string;

@Injectable({ providedIn: 'root' })

export class ClientService {

  constructor(private http: HttpClient) {
    apiUrl = 'https://test-accenture.herokuapp.com';
  }


  getAll() {
    return this.http.get<Client[]>(`${apiUrl}/clients`);
  }

  getById(id: number) {
    return this.http.get(`${apiUrl}/clients/${id}`);
  }

  register(client: Client) {
    return this.http.post(`${apiUrl}/clients/register`, client);
  }



}