import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DiaryService } from '../../../services/diary.service';

@Component({
  selector: 'app-diary-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './diary-view.component.html',
  styleUrls: ['./diary-view.component.css'],
})
export class DiaryViewComponent implements OnInit {
  diary: any = null;

  constructor(
    private route: ActivatedRoute,
    private diaryService: DiaryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.diaryService.getDiaryById(id).subscribe({
        next: (res) => (this.diary = res),
        error: () => alert('Erro ao carregar a jornada.'),
      });
    }
  }
}
