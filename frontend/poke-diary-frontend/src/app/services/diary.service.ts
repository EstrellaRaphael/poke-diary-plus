import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Diary } from '../models/diary.model';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createDiary(data: Omit<Diary, 'id'>): Observable<{ message: string; id?: string }> {
    return this.http.post<{ message: string; id?: string }>(`${this.api}/diary`, data);

    // Simulação:
    // return of({ message: 'Diário criado!', id: '1' }).pipe(delay(500));
  }

  getAllDiaries(): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${this.api}/diary`);

    // Simulação:
    /*
    return of([
      {
        id: '1',
        title: 'Diário de Sinnoh',
        game: 'Platinum',
        notes: 'Comecei com Infernape, derrotei Roark!',
        createdAt: '2025-04-06T12:00:00Z'
      },
      {
        id: '2',
        title: 'Desafio Galar',
        game: 'Sword',
        notes: 'Primeira insígnia conquistada!',
        createdAt: '2025-04-07T08:30:00Z'
      }
    ]).pipe(delay(500));
    */
  }

  getDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(`${this.api}/diary/${id}`);

    // Simulação:
    /*
    return of({
      id,
      title: 'Diário de Hoenn',
      game: 'Emerald',
      notes: 'Capturei um Treecko shiny!',
      createdAt: '2025-04-07T10:45:00Z'
    }).pipe(delay(500));
    */
  }

  updateDiary(id: string, data: Partial<Diary>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.api}/diary/${id}`, data);

    // Simulação:
    // return of({ message: 'Diário atualizado!' }).pipe(delay(500));
  }

  deleteDiary(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/diary/${id}`);

    // Simulação:
    // return of({ message: 'Diário deletado com sucesso!' }).pipe(delay(500));
  }
}
