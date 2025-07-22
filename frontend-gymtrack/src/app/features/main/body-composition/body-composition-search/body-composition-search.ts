import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-body-composition-search',
  imports: [ReactiveFormsModule],
  templateUrl: './body-composition-search.html',
  styleUrl: './body-composition-search.scss'
})
export class BodyCompositionSearch {
  searchTerm = new FormControl('');
  onSearch = output<string | null>()

  constructor() {
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(), 
      takeUntilDestroyed()
    ).subscribe(term => {
      this.onSearch.emit(term);
    });
  }
}
