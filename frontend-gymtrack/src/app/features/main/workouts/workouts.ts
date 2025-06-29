import { Component, signal } from '@angular/core';
import { Workout } from '../../../models/workout';
import { WorkoutCard } from './workout-card/workout-card';
import { AddWorkout } from "./add-workout/add-workout";

@Component({
  selector: 'app-workouts',
  imports: [WorkoutCard, AddWorkout],
  templateUrl: './workouts.html',
  styleUrl: './workouts.scss',
})
export class Workouts {
  isAddModalShown = signal<boolean>(false);
  workouts = signal<Workout[]>([
    {
      type: 'Push day',
      date: 'June 28, 2025',
      exercises: [
        { name: 'Squat', weight: 70 },
        { name: 'Bench Press', weight: 60 },
        { name: 'Tricep Dips', weight: 'bodyweight' },
      ],
    },
    {
      type: 'Pull day',
      date: 'June 27, 2025',
      exercises: [
        { name: 'Pull Up', weight: 'bodyweight' },
        { name: 'Barbell Row', weight: 50 },
        { name: 'Biceps Curl', weight: 20 },
      ],
    },
    {
      type: 'Legs day',
      date: 'June 26, 2025',
      exercises: [
        { name: 'Deadlift', weight: 100 },
        { name: 'Leg Press', weight: 120 },
        { name: 'Calf Raise', weight: 60 },
      ],
    },
  ]);

  onClickDisplayAddModal() {
    this.isAddModalShown.set(true);
  }

  onModalSave(workout: Workout) {
    this.workouts.update(old => [...old, workout]);
    this.isAddModalShown.set(false);
  }

  onModalCancel() {
    this.isAddModalShown.set(false);
  }
}
