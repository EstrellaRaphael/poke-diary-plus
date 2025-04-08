import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Challenge, ChallengeProgress } from '../models/challenge.model';


@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createChallenge(data: { name: string; type: string; rules?: string }): Observable<{ message: string; id?: string }> {
    return this.http.post<{ message: string; id?: string }>(`${this.api}/challenge`, data);

    // Simulação:
    // return of({ message: 'Desafio criado!', id: '1' }).pipe(delay(500));
  }

  getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.api}/challenge`);

    // Simulação:
    /*
    return of([
      {
        id: '1',
        name: 'Desafio Kanto',
        type: 'Nuzlocke',
        status: 'ativo',
        rules: 'Regra de teste',
        progress: {
          caught: ['Pikachu', 'Pidgeotto'],
          fainted: [],
          badges: ['Brock']
        }
      }
    ]).pipe(delay(500));
    */
  }

  getChallengeById(id: string): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.api}/challenge/${id}`);

    // Simulação:
    /*
    return of({
      id,
      name: 'Desafio Johto',
      type: 'Nuzlocke',
      rules: 'Apenas 1 Pokémon por rota',
      status: 'ativo'
    }).pipe(delay(500));
    */
  }

  updateChallenge(id: string, data: Partial<Challenge>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.api}/challenge/${id}`, data);

    // Simulação:
    // return of({ message: 'Desafio atualizado!' }).pipe(delay(500));
  }

  updateChallengeStatus(id: string, status: 'completo' | 'falhou'): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.api}/challenge/${id}`, { status });

    // Simulação:
    // return of({ message: `Status alterado para ${status}` }).pipe(delay(500));
  }

  getProgressByChallengeId(challengeId: string): Observable<ChallengeProgress> {
    return this.http.get<ChallengeProgress>(`${this.api}/challenge/${challengeId}/progress`);

    // Simulação:
    /*
    return of({
      caught: ['Bulbasaur', 'Butterfree'],
      fainted: ['Rattata'],
      badges: ['Misty']
    }).pipe(delay(500));
    */
  }

  saveProgress(challengeId: string, progress: ChallengeProgress): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.api}/challenge/${challengeId}/progress`, progress);

    // Simulação:
    // return of({ message: 'Progresso salvo!' }).pipe(delay(500));
  }

  getPublicChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.api}/challenge/feed`);

    // Simulação:
    /*
    return of([
      {
        id: '1',
        name: 'Desafio Hardcore',
        type: 'Hardcore Nuzlocke',
        status: 'completo',
        owner: 'ash',
        progress: {
          caught: ['Charizard', 'Gyarados', 'Snorlax'],
          fainted: ['Pidgeot'],
          badges: ['Brock', 'Misty', 'Erika']
        }
      },
      {
        id: '2',
        name: 'Desafio Johto',
        type: 'Nuzlocke',
        status: 'ativo',
        owner: 'misty',
        progress: {
          caught: ['Typhlosion'],
          fainted: [],
          badges: ['Falkner']
        }
      }
    ]).pipe(delay(500));
    */
  }

  getChallengesByTrainer(username: string): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.api}/trainer/${username}/challenges`);

    // Simulação:
    /*
    return of([
      {
        id: '1',
        name: 'Rota de Kanto',
        type: 'Randomlocke',
        status: 'ativo',
        progress: {
          caught: ['Venusaur', 'Raichu'],
          fainted: [],
          badges: ['Lt. Surge']
        }
      },
      {
        id: '2',
        name: 'Nuzlocke Johto',
        type: 'Nuzlocke',
        status: 'completo',
        progress: {
          caught: ['Typhlosion', 'Ampharos'],
          fainted: ['Feraligatr'],
          badges: ['Whitney', 'Morty']
        }
      }
    ]).pipe(delay(500));
    */
  }
}
