import { Component, input, signal } from '@angular/core';
import { BodyCompositionModel } from '../../../../models/body-composition';

@Component({
  selector: 'app-body-composition-table',
  imports: [],
  templateUrl: './body-composition-table.html',
  styleUrl: './body-composition-table.scss'
})
export class BodyCompositionTable {
  bodyCompositions = input.required<BodyCompositionModel[]>();
}
