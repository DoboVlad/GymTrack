import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Workout } from 'src/app/models/Workout';
import { MOCK_WORKOUTS } from 'src/app/shared/mock-workouts';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class HistoryListComponent  implements OnInit {
  workoutMockup!: Workout[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.workoutMockup = MOCK_WORKOUTS;
  }

  async openWorkoutDetail(workout: Workout) {
    const modal = await this.modalCtrl.create({
      component: HistoryDetailComponent,
      componentProps: { workout }
    });
    await modal.present();
  }

  totalWeight(workout: Workout): number {
    return workout.exercise
      .map(e => e.weightKg)
      .reduce((sum, w) => sum + w, 0);
  }

  openAddWorkout() {
    console.log('open add-workout form');
  }

}
