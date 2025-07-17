import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSearch } from './workout-search';

describe('WorkoutSearch', () => {
  let component: WorkoutSearch;
  let fixture: ComponentFixture<WorkoutSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
