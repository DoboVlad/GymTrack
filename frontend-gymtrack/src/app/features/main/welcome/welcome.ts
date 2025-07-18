import { Component } from '@angular/core';
import { RecentHistory } from '../history/recent-history/recent-history';
import { RecentWorkout } from '../../../models/recent-history';
import { BodyCompositionModel } from '../../../models/body-composition';
import { LastBodyComposition } from "../body-composition/last-body-composition/last-body-composition";

@Component({
  selector: 'app-welcome',
  imports: [RecentHistory, LastBodyComposition],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  lastBodyCompDate: any;
  bodyComp: BodyCompositionModel = {
    id: '1',
    date: 'random date',
    weight: 10,
    bodyFat: 10,
    muscleMass: 10,
    bodyWater: 10,
    boneMass: 10,
    metabolicAge: 10,
  };
  lastThreeWorkouts: RecentWorkout[] = [
    {
      name: 'Push day',
      date: new Date().toDateString(),
    },
    {
      name: 'Push day',
      date: new Date().toDateString(),
    },
    {
      name: 'Push day',
      date: new Date().toDateString(),
    },
  ];

  constructor() { }
}
