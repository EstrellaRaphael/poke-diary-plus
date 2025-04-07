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
    MatSelectModule
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

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getPublicChallenges().subscribe({
      next: (res) => {
        this.challenges = res;
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
}
