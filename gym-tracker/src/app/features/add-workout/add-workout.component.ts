import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Workout } from 'src/app/models/Workout';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class AddWorkoutComponent {
  @Output() created = new EventEmitter<Workout>();

  form: FormGroup = this.fb.group({
    date: [new Date().toISOString(), Validators.required],
    dayType: ['Push Day', Validators.required],
    exercises: this.fb.array([], Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  get exercises(): FormArray {
    return this.form.get('exercises') as FormArray;
  }

  addExercise() {
    const exGroup = this.fb.group({
      name: ['', Validators.required],
      weightKg: [null, [Validators.required, Validators.min(0)]]
    });
    this.exercises.push(exGroup);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const workout: Workout = {
      id: Date.now().toString(),
      date: this.form.value.date,
      dayType: this.form.value.dayType,
      exercise: this.form.value.exercises
    };
    this.created.emit(workout);
    await this.modalCtrl.dismiss(workout);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
