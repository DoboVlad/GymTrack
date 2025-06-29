import { Component, input } from '@angular/core';
import { BodyCompositionModel } from '../../../../models/body-composition';

@Component({
  selector: 'app-last-body-composition',
  imports: [],
  templateUrl: './last-body-composition.html',
  styleUrl: './last-body-composition.scss'
})
export class LastBodyComposition {
  lastBodyCompDate = input.required<string>();
  bodyComp = input.required<BodyCompositionModel>();
}
