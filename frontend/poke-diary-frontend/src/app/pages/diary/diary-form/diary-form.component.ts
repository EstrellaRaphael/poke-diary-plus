import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiaryService } from '../../../services/diary.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diary-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css'],
})
export class DiaryFormComponent implements OnInit {
  form: FormGroup;
  diaryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private diaryService: DiaryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      game: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.diaryId = this.route.snapshot.paramMap.get('id');

    if (this.diaryId) {
      this.diaryService.getDiaryById(this.diaryId).subscribe({
        next: (res) => this.form.patchValue(res),
        error: () => alert('Erro ao carregar jornada para edição.'),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.diaryId) {
      this.diaryService.updateDiary(this.diaryId, this.form.value).subscribe({
        next: () => this.router.navigate(['/diary']),
        error: () => alert('Erro ao atualizar jornada.'),
      });
    } else {
      this.diaryService.createDiary(this.form.value).subscribe({
        next: () => this.router.navigate(['/diary']),
        error: () => alert('Erro ao criar jornada.'),
      });
    }
  }
}
