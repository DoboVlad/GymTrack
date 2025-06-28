import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentHistory } from './recent-history';

describe('RecentHistory', () => {
  let component: RecentHistory;
  let fixture: ComponentFixture<RecentHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
