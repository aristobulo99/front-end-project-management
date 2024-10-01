import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLComponent } from './card-l.component';

describe('CardLComponent', () => {
  let component: CardLComponent;
  let fixture: ComponentFixture<CardLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
