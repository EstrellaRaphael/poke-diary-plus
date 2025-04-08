import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Diary } from '../../models/diary.model';

@Component({
  selector: 'app-diary-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.css'],
})
export class DiaryCardComponent {
  @Input() diary!: Diary;
  @Input() showActions: boolean = true;

  @Output() delete = new EventEmitter<string>();

  formatDate(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  onDelete(): void {
    this.delete.emit(this.diary.id);
  }
}
