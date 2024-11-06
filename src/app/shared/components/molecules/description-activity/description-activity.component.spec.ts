import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionActivityComponent } from './description-activity.component';

describe('DescriptionActivityComponent', () => {
  let component: DescriptionActivityComponent;
  let fixture: ComponentFixture<DescriptionActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
