import { TestBed } from '@angular/core/testing';

import { TaskWebSocketService } from './task-web-socket.service';

describe('TaskWebSocketService', () => {
  let service: TaskWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
