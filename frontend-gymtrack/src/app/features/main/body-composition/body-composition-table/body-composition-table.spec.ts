import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCompositionTable } from './body-composition-table';

describe('BodyCompositionTable', () => {
  let component: BodyCompositionTable;
  let fixture: ComponentFixture<BodyCompositionTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCompositionTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCompositionTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
