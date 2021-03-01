import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../../../../store/user';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private store: Store) { }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise(async (resolve, reject) => {
            const loggedInUser = this.store.selectSnapshot(UserState.getUser);

            if (loggedInUser) {
                console.error('[GuestGuard] User is logged in. Redirecting to main...');
                await this.router.navigate(['main']);
                return reject(false);
            }
            // When user is not logged in
            console.log('[GuestGuard] Permission Granted.');
            return resolve(true);
        });
    }
}
