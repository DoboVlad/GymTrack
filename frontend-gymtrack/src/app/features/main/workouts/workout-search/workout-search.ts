import { Component, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

export interface WorkoutFilters {
  searchTerm: string | null;
  dayFilters: {
    pushDay: boolean;
    pullDay: boolean;
    legDay: boolean;
  };
  selectedDate: Date | null;
}

@Component({
  selector: 'app-workout-search',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './workout-search.html',
  styleUrl: './workout-search.scss'
})
export class WorkoutSearch {
  searchTerm = new FormControl('');
  selectedDate = signal<Date | null>(null);
  dayFilters = {
    pushDay: false,
    pullDay: false,
    legDay: false,
  };
  filters = signal<WorkoutFilters | null>(null);
  onFiltersChange = output<WorkoutFilters>();

  constructor() {
    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.onSearchChange();
    });
  }

  onSearchChange() {
    this.onFiltersChange.emit({
      searchTerm: this.searchTerm.value,
      dayFilters: this.dayFilters,
      selectedDate: this.selectedDate(),
    });
  }
}
