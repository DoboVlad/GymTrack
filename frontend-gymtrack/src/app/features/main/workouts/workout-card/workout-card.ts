import { Component, input } from '@angular/core';
import { Workout } from '../../../../models/workout';
import { ExerciseRow } from "../exercise-row/exercise-row";

@Component({
  selector: 'app-workout-card',
  imports: [ExerciseRow],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.scss'
})
export class WorkoutCard {
  workout = input.required<Workout>();
}
