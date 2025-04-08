import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryService } from '../../../services/diary.service';
import { Diary } from '../../../models/diary.model';
import { DiaryCardComponent } from '../../../components/diary-card/diary-card.component';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [
    CommonModule,
    DiaryCardComponent
  ],
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css'],
})
export class DiaryListComponent implements OnInit {
  diaries: Diary[] = [];

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.diaryService.getAllDiaries().subscribe({
      next: (res) => (this.diaries = res),
      error: () => alert('Erro ao carregar jornadas.'),
    });
  }

  deleteDiary(id: string): void {
    const confirmar = confirm('Tem certeza que deseja excluir esta jornada?');
    if (confirmar) {
      this.diaryService.deleteDiary(id).subscribe({
        next: () => {
          this.diaries = this.diaries.filter(d => d.id !== id);
        },
        error: () => alert('Erro ao excluir a jornada.')
      });
    }
  }
}
