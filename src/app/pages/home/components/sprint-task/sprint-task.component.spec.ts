import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTaskComponent } from './sprint-task.component';

describe('SprintTaskComponent', () => {
  let component: SprintTaskComponent;
  let fixture: ComponentFixture<SprintTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
