import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DiaryService } from '../../../services/diary.service';

@Component({
  selector: 'app-diary-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './diary-edit.component.html',
  styleUrls: ['./diary-edit.component.css']
})
export class DiaryEditComponent implements OnInit {
  form!: FormGroup;
  diaryId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private diaryService: DiaryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.diaryId = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.fb.group({
      title: ['', Validators.required],
      game: ['', Validators.required],
      notes: ['']
    });

    this.diaryService.getDiaryById(this.diaryId).subscribe({
      next: (diary) => this.form.patchValue(diary),
      error: () => alert('Erro ao carregar a jornada para edição.')
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.diaryService.updateDiary(this.diaryId, this.form.value).subscribe({
        next: () => this.router.navigate(['/diary/list']),
        error: () => alert('Erro ao atualizar a jornada.')
      });
    }
  }
}
