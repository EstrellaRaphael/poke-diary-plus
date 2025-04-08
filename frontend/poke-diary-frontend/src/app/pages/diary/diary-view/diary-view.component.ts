import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DiaryService } from '../../../services/diary.service';
import { Diary } from '../../../models/diary.model';

@Component({
  selector: 'app-diary-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './diary-view.component.html',
  styleUrls: ['./diary-view.component.css']
})
export class DiaryViewComponent implements OnInit {
  diary: Diary | null = null;

  constructor(
    private route: ActivatedRoute,
    private diaryService: DiaryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.diaryService.getDiaryById(id).subscribe({
        next: (res: Diary) => this.diary = res,
        error: () => alert('Erro ao carregar diário.')
      });
    }
  }
}
