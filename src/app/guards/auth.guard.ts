import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const sharedService = inject(SharedService)
  const router = inject(Router)

  return authService.isAuthenticated()
    .pipe(
      map(res => {
        if (!res) return false;

        const user = localStorage.getItem('user')

        sharedService.changeUser(user ? JSON.parse(user): {})
        return true;
      }),
      catchError((err) => {
        router.navigate(['/auth']);
        return of(false);
      })
    );
};
