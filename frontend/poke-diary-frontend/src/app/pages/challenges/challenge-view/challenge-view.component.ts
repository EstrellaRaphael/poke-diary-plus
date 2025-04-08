import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChallengeService } from '../../../services/challenge.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Challenge, ChallengeProgress } from '../../../models/challenge.model';

@Component({
  selector: 'app-challenge-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.css']
})
export class ChallengeViewComponent implements OnInit {
  challenge: Challenge | null = null;

  progress: ChallengeProgress = {
    caught: [] as string[],
    fainted: [] as string[],
    badges: [] as string[]
  };

  newCaught = '';
  newFainted = '';
  newBadge = '';

  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.challengeService.getChallengeById(id).subscribe({
        next: (res: Challenge) => this.challenge = res,
        error: () => alert('Erro ao carregar o desafio.')
      });

      this.challengeService.getProgressByChallengeId(id).subscribe({
        next: (res: ChallengeProgress) => this.progress = res,
        error: () => console.warn('Progresso ainda não existe.')
      });
    }
  }

  finalizar(status: 'completo' | 'falhou') {
    if (!this.challenge) return;
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

  addTo(list: keyof ChallengeProgress, value: string): void {
    if (!value.trim()) return;
    this.progress[list].push(value.trim());
    if (list === 'caught') this.newCaught = '';
    if (list === 'fainted') this.newFainted = '';
    if (list === 'badges') this.newBadge = '';
  }

  removeFrom(list: keyof ChallengeProgress, index: number): void {
    this.progress[list].splice(index, 1);
  }

  saveProgress(): void {
    if (!this.challenge) return;
    this.isSaving = true;
    this.challengeService.saveProgress(this.challenge.id, this.progress)
      .pipe(finalize(() => this.isSaving = false))
      .subscribe({
        next: () => alert('Progresso salvo com sucesso!'),
        error: () => alert('Erro ao salvar progresso.')
      });
  }

  getPokemonSprite(name: string): string {
    const sanitized = name.toLowerCase().replace(/\s/g, '-').replace(/[.'"]/g, '');
    return `https://img.pokemondb.net/sprites/home/normal/${sanitized}.png`;
  }
}
