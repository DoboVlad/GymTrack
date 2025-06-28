import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBodyComposition } from './last-body-composition';

describe('LastBodyComposition', () => {
  let component: LastBodyComposition;
  let fixture: ComponentFixture<LastBodyComposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastBodyComposition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastBodyComposition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
