// challenge-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-challenge-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.css']
})
export class ChallengeCardComponent {
  @Input() challenge!: Challenge;
  @Input() liked: boolean = false;
  @Input() likeCount: number = 0;
  @Input() showLike: boolean = true;

  @Output() likeToggled = new EventEmitter<string>();

  getPokemonSprite(name: string): string {
    const sanitized = name.toLowerCase().replace(/\s/g, '-').replace(/[.'"]/g, '');
    return `https://img.pokemondb.net/sprites/home/normal/${sanitized}.png`;
  }

  toggleLike(): void {
    this.likeToggled.emit(this.challenge.id);
  }

  getStatusColor(): string {
    switch (this.challenge.status) {
      case 'completo': return 'green';
      case 'falhou': return 'red';
      default: return 'blue';
    }
  }
} 
