import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadProjectUsersGuardGuard } from './load-project-users-guard.guard';

describe('loadProjectUsersGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadProjectUsersGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
