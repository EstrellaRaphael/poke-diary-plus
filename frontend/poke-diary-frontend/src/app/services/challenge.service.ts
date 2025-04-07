import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createChallenge(data: { name: string; type: string; rules?: string }) {
    // return this.http.post(`${this.api}/challenge`, data);

    // Simulação:
    return of({ message: 'Desafio criado!', id: '1' }).pipe(delay(500));
  }

  getAllChallenges() {
    // return this.http.get<any[]>(`${this.api}/challenge`);

    // Simulação:
    // /*
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
    // */
  }

  getChallengeById(id: string) {
    // return this.http.get<any>(`${this.api}/challenge/${id}`);

    // Simulação:
    // /*
    return of({
      id,
      name: 'Desafio Johto',
      type: 'Nuzlocke',
      rules: 'Apenas 1 Pokémon por rota',
      status: 'ativo'
    }).pipe(delay(500));
    // */
  }

  updateChallenge(id: string, data: any) {
    // return this.http.put(`${this.api}/challenge/${id}`, data);

    // Simulação:
    return of({ message: 'Desafio atualizado!' }).pipe(delay(500));
  }

  updateChallengeStatus(id: string, status: 'completo' | 'falhou') {
    // return this.http.patch(`${this.api}/challenge/${id}`, { status });

    // Simulação:
    return of({ message: `Status alterado para ${status}` }).pipe(delay(500));
  }

  getProgressByChallengeId(challengeId: string) {
    // return this.http.get(`${this.api}/challenge/${challengeId}/progress`);

    // Simulação:
    // /*
    return of({
      caught: ['Bulbasaur', 'Butterfree'],
      fainted: ['Rattata'],
      badges: ['Misty']
    }).pipe(delay(500));
    // */
  }

  saveProgress(challengeId: string, progress: { caught: string[], fainted: string[], badges: string[] }) {
    // return this.http.put(`${this.api}/challenge/${challengeId}/progress`, progress);

    // Simulação:
    return of({ message: 'Progresso salvo!' }).pipe(delay(500));
  }

  getPublicChallenges() {
    // return this.http.get<any[]>(`${this.api}/challenge/feed`);

    // Simulação:
    // /*
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
    // */
  }

  getChallengesByTrainer(username: string) {
    // return this.http.get<any[]>(`${this.api}/trainer/${username}/challenges`);

    // Simulação:
    // /*
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
    // */
  }
}
