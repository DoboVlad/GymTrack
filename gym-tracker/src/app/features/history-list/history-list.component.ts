import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/Workout';
import { MOCK_WORKOUTS } from 'src/app/shared/mock-workouts';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { IonContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonNote, IonLabel, IonHeader, IonToolbar, IonTitle, ModalController } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  imports: [CommonModule, IonFab, IonFabButton, IonIcon, IonContent, IonList, IonItem, IonNote, IonLabel, IonHeader, IonToolbar, IonTitle]
})
export class HistoryListComponent implements OnInit {
  workoutMockup!: Workout[];

  constructor(private modalCtrl: ModalController) {
    addIcons({ add });
   }

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

  async openAddWorkout() {
    const modal = await this.modalCtrl.create({
      component: AddWorkoutComponent
    });
    modal.onDidDismiss<Workout>().then(({ data }) => {
      if (data) {
        this.workoutMockup.unshift(data);
      }
    });
    await modal.present();
  }

  totalWeight(workout: Workout): number {
    return workout.exercise
      .map(e => e.weightKg)
      .reduce((sum, w) => sum + w, 0);
  }
}
