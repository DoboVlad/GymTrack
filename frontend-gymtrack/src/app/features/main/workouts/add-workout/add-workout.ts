import { Component, output } from '@angular/core';
import { Workout } from '../../../../models/workout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-workout',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-workout.html',
  styleUrl: './add-workout.scss',
})
export class AddWorkout {
  save = output<Workout>();
  cancel = output<void>();
  workoutTypes = ['Push Day', 'Pull Day', 'Legs Day'];

  workout: Workout = {
    type: '',
    date: '',
    exercises: [{ name: '', weight: 0 }],
  };

  addExercise() {
    this.workout.exercises.push({ name: '', weight: 0 });
  }

  removeExercise(idx: number) {
    this.workout.exercises.splice(idx, 1);
  }

  onSave() {
    // Convert weight fields
    this.workout.exercises = this.workout.exercises.map(e => ({
      name: e.name,
      weight: isNaN(Number(e.weight)) || (e.weight + '').toLowerCase() === 'bodyweight'
        ? 'bodyweight'
        : Number(e.weight)
    }));
    this.save.emit({ ...this.workout });
    this.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.reset();
  }

  reset() {
    this.workout = {
      type: '',
      date: '',
      exercises: [{ name: '', weight: 0 }]
    };
  }
}
