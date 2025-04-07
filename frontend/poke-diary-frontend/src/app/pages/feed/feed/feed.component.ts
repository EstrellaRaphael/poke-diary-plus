import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChallengeService } from '../../../services/challenge.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  challenges: any[] = [];
  selectedType: string = 'todos';
  selectedStatus: string = 'todos';

  tipos = ['todos', 'Nuzlocke', 'Randomlocke', 'Hardcore Nuzlocke'];
  statusList = ['todos', 'ativo', 'completo', 'falhou'];

  filteredChallenges: any[] = [];

  likedChallenges: Set<string> = new Set();
  likes: { [id: string]: number } = {};

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getPublicChallenges().subscribe({
      next: (res) => {
        this.challenges = res;
        this.challenges.forEach(ch => {
          this.likes[ch.id] = Math.floor(Math.random() * 10); // simula curtidas iniciais
        });
        const storedLikes = localStorage.getItem('likedChallenges');
        if (storedLikes) {
          this.likedChallenges = new Set(JSON.parse(storedLikes));
        }
        this.applyFilters();
      },
      error: () => alert('Erro ao carregar o feed.')
    });
  }

  getPokemonSprite(name: string): string {
    const sanitized = name.toLowerCase().replace(/\s/g, '-').replace(/[.'"]/g, '');
    return `https://img.pokemondb.net/sprites/home/normal/${sanitized}.png`;
  }

  applyFilters() {
    this.filteredChallenges = this.challenges.filter(challenge => {
      const tipoOk = this.selectedType === 'todos' || challenge.type === this.selectedType;
      const statusOk = this.selectedStatus === 'todos' || challenge.status === this.selectedStatus;
      return tipoOk && statusOk;
    });
  }

  toggleLike(challengeId: string) {
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
