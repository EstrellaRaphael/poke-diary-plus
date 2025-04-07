import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private api = 'http://localhost:8080/api'; // ou a URL do seu backend

  constructor(private http: HttpClient) {}

  createDiary(data: { title: string; game: string; notes?: string }) {
    return this.http.post(`${this.api}/diary`, data);
  }
}
