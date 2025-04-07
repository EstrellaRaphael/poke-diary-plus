import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  username = '';
  challenges: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.challengeService.getChallengesByTrainer(this.username).subscribe({
      next: (res) => this.challenges = res,
      error: () => alert('Erro ao carregar desafios do treinador.')
    });
  }

  getPokemonSprite(name: string): string {
    const sanitized = name.toLowerCase().replace(/\s/g, '-').replace(/[.'"]/g, '');
    return `https://img.pokemondb.net/sprites/home/normal/${sanitized}.png`;
  }
}
