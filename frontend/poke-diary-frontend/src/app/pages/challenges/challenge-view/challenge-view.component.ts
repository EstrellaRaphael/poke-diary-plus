import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-challenge-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.css']
})
export class ChallengeViewComponent implements OnInit {
  challenge: any = null;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.challengeService.getChallengeById(id).subscribe({
        next: (res) => this.challenge = res,
        error: () => alert('Erro ao carregar o desafio.')
      });
    }
  }

  finalizar(status: 'completo' | 'falhou') {
    const mensagem = status === 'completo'
      ? 'Deseja marcar este desafio como COMPLETO?'
      : 'Deseja marcar este desafio como FALHOU?';

    if (confirm(mensagem)) {
      this.challengeService.updateChallengeStatus(this.challenge.id, status).subscribe({
        next: () => window.location.reload(), 
        error: () => alert('Erro ao atualizar status do desafio.')
      });
    }
  }
}
