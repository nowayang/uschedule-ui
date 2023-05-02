import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayNavComponent } from './day-nav.component';

describe('DayNavComponent', () => {
  let component: DayNavComponent;
  let fixture: ComponentFixture<DayNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
