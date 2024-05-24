import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_Services/account.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const toaster = inject(ToastrService);
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) return true;
      else {
        toaster.error('Your shall not pass');
        return false;
      }
    })
  );
};
