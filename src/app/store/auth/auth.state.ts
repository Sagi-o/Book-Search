import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Login, LoginSuccess, LoginError } from '.';
import { tap, catchError } from 'rxjs/operators';

interface AuthStateModel {
    isLoading: boolean;
    error: any;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isLoading: false,
        error: null,
    }
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthService) { }

    @Selector()
    static getIsLoading(state: AuthStateModel) {
        return state.isLoading;
    }

    @Action(Login)
    login({ patchState, dispatch, getState }: StateContext<AuthStateModel>, action: Login) {
        const { email, password } = action;

        patchState({ isLoading: true, error: null });

        return this.authService.login(email, password).pipe(
            tap(_ => {
                dispatch(new LoginSuccess());
            }),
            catchError(error => {
                return dispatch(new LoginError(error));
            })
        );
    }

    @Action(LoginSuccess)
    loginSuccess({ patchState }: StateContext<AuthStateModel>, action: LoginSuccess) {
        patchState({ isLoading: false, error: null });
    }

    @Action(LoginError)
    loginError({ patchState }: StateContext<AuthStateModel>, action: LoginError) {
        const { error } = action;
        patchState({ isLoading: false, error });
    }
}
