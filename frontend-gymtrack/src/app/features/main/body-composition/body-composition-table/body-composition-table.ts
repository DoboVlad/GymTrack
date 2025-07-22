import { Component, HostListener, input, output, signal } from '@angular/core';
import { BodyCompositionModel } from '../../../../models/body-composition';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-body-composition-table',
  imports: [],
  templateUrl: './body-composition-table.html',
  styleUrl: './body-composition-table.scss'
})
export class BodyCompositionTable {
  bodyCompositions = input.required<BodyCompositionModel[]>();
  onDeleteBodyComposition = output<string>();
  onEditBodyComposition = output<BodyCompositionModel>();

  onClickDeleteBodyComposition(bodyCompId: string) {
    this.onDeleteBodyComposition.emit(bodyCompId);
  }

  onClickEditBodyComposition(bodyComp: BodyCompositionModel) {
    this.onEditBodyComposition.emit(bodyComp);
  }

}
