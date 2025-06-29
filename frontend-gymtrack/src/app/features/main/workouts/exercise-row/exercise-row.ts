import { Component, input } from '@angular/core';
import { Exercise } from '../../../../models/exercise';

@Component({
  selector: 'app-exercise-row',
  imports: [],
  templateUrl: './exercise-row.html',
  styleUrl: './exercise-row.scss'
})
export class ExerciseRow {
  exercise = input.required<Exercise>();
}
