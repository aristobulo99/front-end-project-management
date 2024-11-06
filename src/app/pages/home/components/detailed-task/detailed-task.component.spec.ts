import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTaskComponent } from './detailed-task.component';

describe('DetailedTaskComponent', () => {
  let component: DetailedTaskComponent;
  let fixture: ComponentFixture<DetailedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
