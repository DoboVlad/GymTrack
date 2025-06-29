import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComposition } from './add-composition';

describe('AddComposition', () => {
  let component: AddComposition;
  let fixture: ComponentFixture<AddComposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComposition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComposition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
