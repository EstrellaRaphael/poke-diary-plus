import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ChallengeService } from '../../../services/challenge.service';
import { Challenge } from '../../../models/challenge.model';

@Component({
  selector: 'app-challenge-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit {
  form!: FormGroup;
  challengeId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      rules: ['']
    });

    this.challengeService.getChallengeById(this.challengeId).subscribe({
      next: (challenge: Challenge) => this.form.patchValue(challenge),
      error: () => alert('Erro ao carregar desafio.')
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.challengeService.updateChallenge(this.challengeId, this.form.value).subscribe({
        next: () => this.router.navigate(['/challenge/list']),
        error: () => alert('Erro ao atualizar desafio.')
      });
    }
  }
}
