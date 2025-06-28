import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComposition } from './body-composition';

describe('BodyComposition', () => {
  let component: BodyComposition;
  let fixture: ComponentFixture<BodyComposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyComposition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyComposition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
