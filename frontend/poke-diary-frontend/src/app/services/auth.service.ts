import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string, password: string}) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data);
  }

  register(data: { username: string, email: string, password: string}) {
    return this.http.post(`${this.api}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
