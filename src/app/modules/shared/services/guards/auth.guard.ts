import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/store/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store) { }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise(async (resolve, reject) => {
            const loggedInUser = this.store.selectSnapshot(UserState.getUser);

            if (loggedInUser) {
                // const userType: UserType = this.store.selectSnapshot(UserState.getUserType);
                // const allowedUserType: UserType = next.data.userType;

                // if (userType !== allowedUserType) {
                //     console.error('[AuthGuard] User type not allowed to enter this route. Redirecting...');

                //     if (userType === UserType.NGO) {
                //         await this.router.navigate(['leader/dashboard']);
                //     } else {
                //         await this.router.navigate(['company/dashboard']);
                //     }

                //     return resolve(true);
                // }

                console.log('[AuthGuard] Permission granted.');
                return resolve(true);
            }
            // When user is not logged in
            console.error('[AuthGuard] Not allowed to enter when not authenticated. Redirecting to login...');
            await this.router.navigate(['welcome']);
            return reject(false);
        });
    }
}
