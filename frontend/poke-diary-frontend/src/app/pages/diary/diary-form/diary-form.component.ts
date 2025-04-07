import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { DiaryService } from '../../../services/diary.service';

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
export class DiaryFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private diaryService: DiaryService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      game: ['', [Validators.required]],
      notes: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.diaryService.createDiary(this.form.value).subscribe({
      next: () => this.router.navigate(['/diary']),
      error: () => alert('Erro ao criar diário.'),
    });
  }
}
