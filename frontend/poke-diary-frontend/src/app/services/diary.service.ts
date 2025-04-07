import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private api = 'http://localhost:8080/api'; // ou a URL do seu backend

  constructor(private http: HttpClient) { }

  createDiary(data: { title: string; game: string; notes?: string }) {
    return this.http.post(`${this.api}/diary`, data);
  }

  getAllDiaries() {
    return this.http.get<any[]>(`${this.api}/diary`);
  }

  getDiaryById(id: string) {
    return this.http.get<any>(`${this.api}/diary/${id}`);
  }

  updateDiary(id: string, data: { title: string; game: string; notes?: string }) {
    return this.http.put(`${this.api}/diary/${id}`, data);
  }

  deleteDiary(id: string) {
    return this.http.delete(`${this.api}/diary/${id}`);
  }
}
