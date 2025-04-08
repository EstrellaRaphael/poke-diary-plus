import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeService } from '../../../services/challenge.service';
import { Challenge } from '../../../models/challenge.model';
import { ChallengeCardComponent } from '../../../components/challenge-card/challenge-card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChallengeCardComponent
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];

  selectedType = 'todos';
  selectedStatus = 'todos';

  tipos = ['todos', 'Nuzlocke', 'Randomlocke', 'Hardcore Nuzlocke'];
  statusList = ['todos', 'ativo', 'completo', 'falhou'];

  likedChallenges: Set<string> = new Set();
  likes: { [id: string]: number } = {};

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.getPublicChallenges().subscribe({
      next: (res) => {
        this.challenges = res;
        this.challenges.forEach(ch => {
          this.likes[ch.id] = Math.floor(Math.random() * 10); // simulação
        });

        const stored = localStorage.getItem('likedChallenges');
        if (stored) {
          this.likedChallenges = new Set(JSON.parse(stored));
        }

        this.applyFilters();
      },
      error: () => alert('Erro ao carregar o feed.')
    });
  }

  applyFilters(): void {
    this.filteredChallenges = this.challenges.filter(ch => {
      const tipoOk = this.selectedType === 'todos' || ch.type === this.selectedType;
      const statusOk = this.selectedStatus === 'todos' || ch.status === this.selectedStatus;
      return tipoOk && statusOk;
    });
  }

  toggleLike(challengeId: string): void {
    if (this.likedChallenges.has(challengeId)) {
      this.likedChallenges.delete(challengeId);
      this.likes[challengeId]--;
    } else {
      this.likedChallenges.add(challengeId);
      this.likes[challengeId] = (this.likes[challengeId] || 0) + 1;
    }

    localStorage.setItem('likedChallenges', JSON.stringify([...this.likedChallenges]));
  }
}
