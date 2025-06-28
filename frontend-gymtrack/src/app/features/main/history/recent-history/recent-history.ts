import { Component, input } from '@angular/core';
import { RecentWorkout } from '../../../../models/recent-history';

@Component({
  selector: 'app-recent-history',
  imports: [],
  templateUrl: './recent-history.html',
  styleUrl: './recent-history.scss'
})
export class RecentHistory {
  lastThreeWorkouts = input.required<RecentWorkout[]>();
}
