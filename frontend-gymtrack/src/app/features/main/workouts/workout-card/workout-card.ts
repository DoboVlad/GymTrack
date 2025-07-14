import { Component, input, output } from '@angular/core';
import { Workout } from '../../../../models/workout';
import { ExerciseRow } from "../exercise-row/exercise-row";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-card',
  imports: [ExerciseRow, DatePipe ],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.scss'
})
export class WorkoutCard {
  workout = input.required<Workout>();
  deleteWorkout = output<string>();

  onClickDeleteWorkout(workoutId: string) {
    this.deleteWorkout.emit(workoutId);
  }
}
