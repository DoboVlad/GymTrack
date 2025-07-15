import { Component, OnInit, signal } from '@angular/core';
import { BodyCompositionTable } from '../body-composition-table/body-composition-table';
import { AddComposition } from '../add-composition/add-composition';
import { BodyCompositionModel } from '../../../../models/body-composition';
import { BodyCompositionService } from '../../../services/body-composition/body-composition';

@Component({
  selector: 'app-body-composition',
  imports: [BodyCompositionTable, AddComposition],
  templateUrl: './body-composition.html',
  styleUrl: './body-composition.scss',
})
export class BodyComposition implements OnInit {
  showAddBodycompModal = signal(false);
  bodyCompositions = signal<BodyCompositionModel[]>([]);
  bodyCompositionEdited = signal<BodyCompositionModel | null>(null);

  constructor(private bodyCompositionService: BodyCompositionService) { }

  ngOnInit() {
    this.loadBodyCompositions();
  }

  private loadBodyCompositions() {
    this.bodyCompositionService.getBodyCompositions().subscribe({
      next: (compositions) => {
        this.bodyCompositions.set(compositions);
      },
      error: (error) => {
        console.error('Error fetching body compositions:', error);
      }
    });
  }

  onBodyCompSave(newComp: BodyCompositionModel) {
    if (this.bodyCompositionEdited()) {
      this.editBodyComposition(newComp);
    } else {
      this.createBodyComposition(newComp);
    }
    this.showAddBodycompModal.set(false);
  }

  onDeleteBodyComposition(bodyCompositionId: string) {
    console.log('Deleting body composition with ID:', bodyCompositionId);
    this.bodyCompositionService.deleteBodyComposition(bodyCompositionId).subscribe({
      next: () => {
        this.bodyCompositions.update(oldComps => oldComps.filter(comp => comp.id !== bodyCompositionId));
      },
      error: (error) => {
        console.error('Error deleting body composition:', error);
      }
    });
  }

  onEditBodyComposition(bodyComp: BodyCompositionModel) {
    this.showAddBodycompModal.set(true);
    this.bodyCompositionEdited.set(bodyComp);
  }

  private editBodyComposition(bodyComp: BodyCompositionModel) {
    this.bodyCompositionService.updateBodyComposition(bodyComp).subscribe({
      next: (updatedComp) => {
        this.bodyCompositions.update(oldComps => oldComps.map(comp => comp.id === updatedComp.id ? updatedComp : comp));
        this.bodyCompositionEdited.set(null);
      },
      error: (error) => {
        console.error('Error updating body composition:', error);
      }
    });
  }

  private createBodyComposition(bodyComp: BodyCompositionModel) {
    this.bodyCompositionService.createBodyComposition(bodyComp).subscribe({
      next: (createdComp) => {
        this.bodyCompositions.update(oldComp => [createdComp, ...oldComp]);
        this.bodyCompositionEdited.set(null);
      },
      error: (error) => {
        console.error('Error creating body composition:', error);
      }
    });
  }

  onCancel() {
    this.showAddBodycompModal.set(false);
    this.bodyCompositionEdited.set(null);
  }
}
