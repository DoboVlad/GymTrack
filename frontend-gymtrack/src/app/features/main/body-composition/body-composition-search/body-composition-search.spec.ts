import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCompositionSearch } from './body-composition-search';

describe('BodyCompositionSearch', () => {
  let component: BodyCompositionSearch;
  let fixture: ComponentFixture<BodyCompositionSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCompositionSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCompositionSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
