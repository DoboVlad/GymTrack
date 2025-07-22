import { Component, HostListener, OnInit, signal } from '@angular/core';
import { BodyCompositionTable } from '../body-composition-table/body-composition-table';
import { AddComposition } from '../add-composition/add-composition';
import { BodyCompositionModel } from '../../../../models/body-composition';
import { BodyCompositionService } from '../../../services/body-composition/body-composition';
import { BodyCompositionSearch } from "../body-composition-search/body-composition-search";

@Component({
  selector: 'app-body-composition',
  imports: [BodyCompositionTable, AddComposition, BodyCompositionSearch],
  templateUrl: './body-composition.html',
  styleUrl: './body-composition.scss',
})
export class BodyComposition implements OnInit {
  showAddBodycompModal = signal(false);
  bodyCompositions = signal<BodyCompositionModel[]>([]);
  bodyCompositionEdited = signal<BodyCompositionModel | null>(null);
  currentPage = signal(1);
  totalPages = signal(1);

  constructor(private bodyCompositionService: BodyCompositionService) {
  }

  ngOnInit() {
    this.loadBodyCompositions();
  }

  onSeachText(term: string | null) {
    if (term) {
      this.bodyCompositionService.getBodyCompositions(this.currentPage(), term).subscribe({
        next: (response) => {
          this.bodyCompositions.set(response.data);
          this.totalPages.set(response.totalPages);
        }
        , error: (error) => {
          console.error('Error fetching body compositions:', error);
        }
      });
    }
  }

  private loadBodyCompositions() {
    this.bodyCompositionService.getBodyCompositions(this.currentPage()).subscribe({
      next: (response) => {
        this.bodyCompositions.set(response.data);
        this.totalPages.set(response.totalPages);
      },
      error: (error) => {
        console.error('Error fetching body compositions:', error);
      }
    });
  }

  nextPage() {
    this.currentPage.update(p => p + 1);
    this.loadBodyCompositions();
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadBodyCompositions();
    }
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
