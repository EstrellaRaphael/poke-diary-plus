import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createChallenge(data: { name: string; type: string; rules?: string }) {
    return this.http.post(`${this.api}/challenge`, data);
  }

  getAllChallenges() {
    return this.http.get<any[]>(`${this.api}/challenge`);
  }

  getChallengeById(id: string) {
    return this.http.get<any>(`${this.api}/challenge/${id}`);
  }

  updateChallenge(id: string, data: any) {
    return this.http.put(`${this.api}/challenge/${id}`, data);
  }

  updateChallengeStatus(id: string, status: 'completo' | 'falhou') {
    return this.http.patch(`${this.api}/challenge/${id}`, { status });
  }

  getProgressByChallengeId(challengeId: string) {
    return this.http.get(`${this.api}/challenge/${challengeId}/progress`);
  }

  saveProgress(challengeId: string, progress: { caught: string[], fainted: string[], badges: string[] }) {
    return this.http.put(`${this.api}/challenge/${challengeId}/progress`, progress);
  }
  getPublicChallenges() {
    return this.http.get<any[]>(`${this.api}/challenge/feed`);
  }
}
