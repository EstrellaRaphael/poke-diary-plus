import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ChallengeService } from '../../../services/challenge.service';

@Component({
  selector: 'app-challenge-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css']
})
export class ChallengeFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private challengeService: ChallengeService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      rules: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.challengeService.createChallenge(this.form.value).subscribe({
        next: (res: { message: string; id?: string}) => {
          this.router.navigate(['/dashboard']);
        },
        error: () => alert('Erro ao criar desafio.')
      });
    }
  }
}
