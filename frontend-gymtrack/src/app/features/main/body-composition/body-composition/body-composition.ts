import { Component, signal } from '@angular/core';
import { BodyCompositionTable } from '../body-composition-table/body-composition-table';
import { AddComposition } from '../add-composition/add-composition';
import { BodyCompositionModel } from '../../../../models/body-composition';

@Component({
  selector: 'app-body-composition',
  imports: [BodyCompositionTable, AddComposition],
  templateUrl: './body-composition.html',
  styleUrl: './body-composition.scss',
})
export class BodyComposition {
  showAddBodycompModal = signal(false);
  bodyCompositions = signal<BodyCompositionModel[]>([
    {
      date: '2025-06-28',
      weight: 80,
      bodyFat: 15,
      muscleMass: 60,
      bodyWater: 55,
      boneMass: 3.2,
      metabolicAge: 25,
    },
    {
      date: '2025-06-21',
      weight: 81,
      bodyFat: 15.5,
      muscleMass: 59,
      bodyWater: 54,
      boneMass: 3.2,
      metabolicAge: 26,
    },
    {
      date: '2025-06-14',
      weight: 82,
      bodyFat: 16,
      muscleMass: 58,
      bodyWater: 53,
      boneMass: 3.1,
      metabolicAge: 27,
    },
  ]);

  onBodyCompSave(newComp: BodyCompositionModel) {
    this.bodyCompositions.update(oldComp => [...oldComp, newComp]);
  }

  onCancel() {
    this.showAddBodycompModal.set(false);
  }
}
