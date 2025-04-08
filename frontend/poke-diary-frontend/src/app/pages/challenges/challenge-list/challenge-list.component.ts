import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChallengeService } from '../../../services/challenge.service';
import { Challenge } from '../../../models/challenge.model';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.getAllChallenges().subscribe({
      next: (res: Challenge[]) => this.challenges = res,
      error: () => alert('Erro ao carregar desafios.')
    });
  }
}
