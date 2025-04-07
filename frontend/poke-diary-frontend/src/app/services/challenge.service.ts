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
}
