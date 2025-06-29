import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BodyCompositionModel } from '../../../../models/body-composition';

@Component({
  selector: 'app-add-composition',
  imports: [FormsModule],
  templateUrl: './add-composition.html',
  styleUrl: './add-composition.scss',
})
export class AddComposition {
  save = output<BodyCompositionModel>();
  cancel = output<void>();

  bodyComp: BodyCompositionModel = {
    date: '',
    weight: 0,
    bodyFat: 0,
    muscleMass: 0,
    bodyWater: 0,
    boneMass: 0,
    metabolicAge: 0,
  };

  onSave() {
    this.save.emit({ ...this.bodyComp });
    this.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.reset();
  }

  reset() {
    this.bodyComp = {
      date: '',
      weight: 0,
      bodyFat: 0,
      muscleMass: 0,
      bodyWater: 0,
      boneMass: 0,
      metabolicAge: 0,
    };
  }
}
